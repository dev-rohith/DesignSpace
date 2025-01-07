import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import crypto from "crypto";

import User from "../models/user-model.js";
import { TokenManager } from "../services/redis-service.js";
import { Token } from "../services/token-service.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

const authController = {};

//passport middileware
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "auth/google/callback",
    },
    async (_, __, profile, done) => {
      try {
        let user = await User.find({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            googleId: profile.id,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

//need to work on this
authController.googleLoginSuccess = catchAsync(async (req, res) => {
  // Handle successful authentication
  const deviceId = uuidv4();
  const accessToken = jwt.sign(
    { userId: req.user._id, deviceId },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: req.user._id, deviceId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  // Store device info
  req.user.devices.push({
    deviceId,
    name: "Google OAuth Login",
    lastLogin: new Date(),
    refreshToken,
  });
  await req.user.save();

  // Store refresh token in Redis
  await TokenManager.storeRefreshToken(req.user._id, deviceId, refreshToken);

  // Redirect to frontend with tokens
  res.redirect(
    `${process.env.FRONTEND_URL}/auth/callback?` +
      `accessToken=${accessToken}&refreshToken=${refreshToken}&deviceId=${deviceId}`
  );
});

//normal login flow
authController.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  res.json(user);
});

authController.login = catchAsync(async (req, res, next) => {
  const cookie = req.cookies;
  const { email, password } = req.body;
  const userAgent =
    req.get["User-Agent"] ||
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/537.36";

  const parser = new UAParser();
  const { device, os, browser } = parser.setUA(userAgent).getResult();

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("user not found try to signup", 404));

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("invalid credentials", 403));
  }

  const deviceId = uuidv4();

  if (user.devices.length >= user.maxDevices) {
    return next(
      new AppError("device limit remove logout a device to login", 400)
    );
  } else {
    user.devices.push({
      deviceId: deviceId, //this should be removed in logout
      deviceName: device?.vendor || browser?.name || os?.name || "unkown",
    });

    if (user.lastActive.length >= 2) {
      user.lastActive.shift();
      user.lastActive.push(Date.now());
    } else {
      user.lastActive.push(Date.now());
    }
  }

  const accessToken = Token.generateAccessToken(user._id, user.role);

  const refreshToken = Token.generateRefreshToken(
    user._id,
    user.role,
    deviceId
  );

  await TokenManager.storeRefreshToken(user._id, deviceId, refreshToken);

  res.cookie("jwt", refreshToken, { httpOnly: true });

  await user.save();

  res.json({
    accessToken: accessToken,
  });
});

authController.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    //email logic here

    // await new Email(user, resetURL).sendPasswordReset();

    // res.status(200).json({
    //   status: "success",
    //   message: "Token sent to email!",
    // });
    res.json({ resetToken });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

authController.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.devices.forEach(async (device) => {
    await TokenManager.removeRefreshToken(user._id, device.deviceId);
  });

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  const token = Token.generateAccessToken(user._id, user.role);

  res.json({ token });
});

export default authController;
