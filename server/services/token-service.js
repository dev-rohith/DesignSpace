import jwt from "jsonwebtoken";

const Token = {
  generateAccessToken(...secret) {
    jwt.sign({ ...secret }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRE * 60,
    });
  },
  generateRefreshToken(id) {
    jwt.sign({ userId: id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRE * 24 * 60 * 60,
    });
  },
};
