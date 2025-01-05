import connectRedis from "../config/redis-config.js";

export const TokenManager = {
  async storeRefreshToken(userId, deviceId, refreshToken) {
    const key = `refresh_token:${userId}:${deviceId}`;
    await connectRedis.set(key, refreshToken, "EX", 60 * 60 * 24 * 30); // 30 days expiry
  },

  async validateRefreshToken(userId, deviceId, refreshToken) {
    const storedToken = await connectRedis.get(
      `refresh_token:${userId}:${deviceId}`
    );
    return storedToken === refreshToken;
  },

  async removeRefreshToken(userId, deviceId) {
    await connectRedis.del(`refresh_token:${userId}:${deviceId}`);
  },
};
