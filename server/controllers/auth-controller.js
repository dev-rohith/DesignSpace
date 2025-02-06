import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/user-model.js";
import { TokenManager } from "../services/redis-service.js";
import { Token } from "../services/token-service.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";
import Email from "../utils/send-email.js";

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

/////////////////////////////////////////////--------Normal-login-flow--------///////////////////////////////////////////////////////////

authController.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate input data
  if (!firstName || !lastName || !email || !password) {
    return next(new AppError("Please provide all required fields", 400));
  }

  // Generate OTP
  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    otp: generatedOtp,
    otpExpiresIn: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
  });

  if (!user) {
    return next(new AppError("Error while creating user account", 500));
  }

  try {
    await new Email(user.firstName, user.email).sendOtp(user.otp);

    res.status(200).json({
      status: "success",
      message: "Verify the OTP to create your account",
      token: user._id,
    });
  } catch (error) {
    await User.findByIdAndDelete(user._id, { new: true });
    return next(
      new AppError(
        "Error while sending verification email. Please try again later.",
        500
      )
    );
  }
});

authController.verifyUser = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;
  const { otp } = req.body;

  if (isNaN(otp)) return next(new AppError("otp must be an number", 400));

  const user = await User.findById(user_id).select(
    "otp otp_chances otpExpiresIn isVerified"
  );

  if (!user)
    return next(new AppError("user not found try to sign up again", 400));

  // Check OTP chances BEFORE any modifications
  if (user.otp_chances <= 0) {
    return next(
      new AppError(
        "otp chances has been over, misuse of otp may cause deactivation of account",
        400
      )
    );
  }

  if (new Date(user.otpExpiresIn) < new Date()) {
    return next(new AppError("Otp has been expired. try resend again.", 400));
  }

  if (Number(otp) === user.otp) {
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresIn = undefined;
    user.otp_chances = 3;
    await user.save();

    return res.status(201).json({
      message: "your account has be created successfully",
    });
  } else {
    // Decrement chances
    user.otp_chances = user.otp_chances - 1;
    await user.save();

    return res.status(400).json({
      message: `Incorrect Otp you have ${user.otp_chances} chances left`,
    });
  }
});

authController.resendVerification = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  if (!user)
    next(
      new AppError(
        "user not found try to signup first to send verification",
        404
      )
    );
  if (user.resend_limit < 1)
    throw new AppError("Resend request limit over try again after 24h", 400);

  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  (user.otp = generatedOtp),
    (user.resend_limit = user.resend_limit - 1),
    (user.otpExpiresIn = Date.now() + 5 * 60 * 1000), // OTP expiry 5 minutes
    await user.save();

  await new Email(user.firstName, user.email).sendOtp(user.otp);
  res.status(200).json({
    status: "success",
    message: "A new OTP has been sent to your registered email.",
  });
});

authController.login = catchAsync(async (req, res, next) => {
  const cookie = req.cookies;
  const { email, password } = req.body;
  const userAgent =
    req.get["User-Agent"] ||
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/537.36";
  const parser = new UAParser();
  const { device, os, browser } = parser.setUA(userAgent).getResult();

  if (cookie?.jwt) {
    jwt.verify(
      cookie.jwt,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        res.clearCookie("jwt");
        if (!err) {
          await TokenManager.removeRefreshToken(user._id, user.deviceId);
        }
      }
    );
  }

  const user = await User.findOne({ email, isVerified: true }).select(
    "+password"
  );

  if (!user)
    return next(
      new AppError("user not found or not verified try to signup again", 404)
    );

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("invalid credentials", 403));
  }

  if (user.status === "suspended") {
    return next(new AppError("Your Account has been suspended", 403));
  }

  const deviceId = uuidv4(); //may be later changed with device ip
  const deviceName = device?.vendor || browser?.name || os?.name || "unkown";

  const accessToken = Token.generateAccessToken(
    user._id,
    user.role,
    user.status
  );

  const refreshToken = Token.generateRefreshToken(
    user._id,
    user.role,
    deviceId
  );

  res.cookie("jwt", refreshToken, { httpOnly: true });

  // Initialize arrays only if undefined (no need for separate initialization)
  if (user.devices.length >= user.maxDevices) {
    return res.status(400).json({
      message: "Device limit reached. Please log out of a device to log in.",
      data: user.devices,
    });
  }

  // Push the new device directly and manage the last login array in one step
  user.devices.push({ deviceId, deviceName });
  user.lastLoginOn.length >= 2 && user.lastLoginOn.shift(); // Remove oldest if over limit
  user.lastLoginOn.push(Date.now()); // Update the last login timestamp

  await TokenManager.storeRefreshToken(user._id, deviceId, refreshToken);

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
  //if possible on email to the user
  // Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
  });

  // If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // Removing all the refresh tokens from the redis
  user.devices.forEach(async (device) => {
    await TokenManager.removeRefreshToken(user._id, device.deviceId);
  });

  // Removing all the devices from the database
  user.devices = [];

  //reseting the functionality
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Login in the user and send accessToken
  const accessToken = Token.generateAccessToken(user._id, user.role);

  res.json({ accessToken });
});

authController.logoutDevice = catchAsync(async (req, res, next) => {
  //must remove the token on frontend after each successfull response
  const refreshToken = req.cookies.jwt;
  const { deviceId } = req.params;

  if (!refreshToken) {
    return next(
      new AppError("unethical Access you will be logouted automatically", 403)
    );
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decodedRefresh) => {
      if (err)
        return next(
          new AppError(
            "first login with correct credentials to logout other device",
            403
          )
        );

      const user = await User.findOne({ "devices.deviceId": deviceId });
      if (!user) return next(new AppError("device is not found in db", 404));
      user.devices = user.devices.filter(
        (device) => device.deviceId !== deviceId
      );
      await TokenManager.removeRefreshToken(user._id, deviceId);

      user.save();
      // ---------         if we clear cookie here then user can only logout one device at a time
      res.status(200).json({
        message: "user device logouted successfully go back and login again",
      });
    }
  );
});

authController.logoutUser = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.jwt;

  res.clearCookie("jwt");

  if (!refreshToken) {
    return next(
      new AppError(
        "Unethical access detected. Soon You will be logged out automatically .",
        403
      )
    );
  }

  const decodedRefresh = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(req.user.userId);
  if (!user) {
    return next(new AppError("User not found. Try logging in again.", 403));
  }

  user.devices = user.devices.filter(
    (device) => device.deviceId !== decodedRefresh.deviceId
  );

  await TokenManager.removeRefreshToken(user._id, decodedRefresh.deviceId);

  await user.save();

  return res.json({ message: "Logout successful" });
});

export default authController;
