import jwt from "jsonwebtoken";

import { TokenManager } from "../services/redis-service.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";
import { Token } from "../services/token-service.js";

const authMiddleWare = {};

//protect middleware
authMiddleWare.protect = catchAsync(async (req, res, next) => {
  if (!req.headers["authorization"])
    return next(new AppError("token is required", 400));
  const accessToken = req.headers["authorization"].split(" ")[1];
  if (!accessToken) return next(new AppError("token is required", 400));
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return next(new AppError("invalid token", 401)); //important for the refresh token rotation
    if (decoded.userStatus === "suspended")
      next(new AppError("Your account is suspended", 403));
    req.user = decoded;
    next();
  });
});

//refresh token rotation
authMiddleWare.refreshToken_rotation = catchAsync(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return next(new AppError("token is required", 400));

  const refreshToken = cookie.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decodedRefresh) => {
      if (err) return next(new AppError("invalid token", 403));

      const foundRefreshToken = await TokenManager.validateRefreshToken(
        decodedRefresh.userId,
        decodedRefresh.deviceId,
        refreshToken
      );

      await TokenManager.removeRefreshToken(
        decodedRefresh.userId,
        decodedRefresh.deviceId
      );

      if (!foundRefreshToken) return next(new AppError("access denied", 403));

      const newRefreshToken = Token.generateRefreshToken(
        decodedRefresh.userId,
        decodedRefresh.userRole,
        decodedRefresh.deviceId
      );

      await TokenManager.storeRefreshToken(
        decodedRefresh.userId,
        decodedRefresh.deviceId,
        newRefreshToken
      );

      const newAccessToken = Token.generateAccessToken(
        decodedRefresh.userId,
        decodedRefresh.userRole
      );

      res.cookie("jwt", newRefreshToken, { httpOnly: true });
      res.status(200).json({ accessToken: newAccessToken });
    }
  );
});

//authorize middleware
authMiddleWare.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userRole)) {
      return next(
        new AppError("You dont have permission to perform this action", 403)
      );
    }
    next();
  };
};

export default authMiddleWare;
