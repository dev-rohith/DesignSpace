import { redisClient } from "../config/redis-config.js";

export const TokenManager = {
  async storeRefreshToken(userId, deviceId, refreshToken) {
    const key = `refresh_token:${userId}:${deviceId}`;
    console.log('this is the key',key)
    console.log(refreshToken)
    await redisClient.set(key,refreshToken,{EX: 30*24*60*60}) // 30 days expiry
  },

  async validateRefreshToken(userId, deviceId, refreshToken) {
    const storedToken = await redisClient.get(
      `refresh_token:${userId}:${deviceId}`
    );
    return storedToken === refreshToken;
  },

  async removeRefreshToken(userId, deviceId) {
    await redisClient.del(`refresh_token:${userId}:${deviceId}`);
  },
};
