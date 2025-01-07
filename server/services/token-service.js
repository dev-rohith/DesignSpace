import jwt from "jsonwebtoken";

export const Token = {
  generateAccessToken(userId, userRole) {
    return jwt.sign(
      { userId, userRole },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 30,
      }
    );
  },
  generateRefreshToken(userId, userRole, deviceId) {
    return jwt.sign(
      { userId, userRole, deviceId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: 49,
      }
    );
  },
  
}
