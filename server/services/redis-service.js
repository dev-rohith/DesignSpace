import { redisClient } from "../config/redis-config.js";

export const TokenManager = {
   // token management
  async storeRefreshToken(userId, deviceId, refreshToken) {
    const key = `refresh_token:${userId}:${deviceId}`;
    await redisClient.set(key, refreshToken, { EX: 30 * 24 * 60 * 60 }); // 30 days expiry
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

export const RedisDataManager = {
   //managing  normal data
   async addItemToRedis(uniqueId, data) {
    await redisClient.set(uniqueId, data);
  },

  async removeItemToRedis(uniqueId) {
    await redisClient.del(uniqueId);
  },
  async getItemFromRedis(uniqueId){
      return await redisClient.get(uniqueId)
  }
}
