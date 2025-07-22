import { Redis } from "ioredis";

// export const redisClient = new Redis();

export function createRedisClient() {
  return new Redis();
}