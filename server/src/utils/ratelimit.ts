import { KaitoError } from "@kaito-http/core";
import type { RedisClient } from "bun";
import { config } from "config.js";

interface RateLimitOptions {
	windowMs: number;
	max: 1;
	keyPrefix?: string;
}

export const createRateLimiter = (options: RateLimitOptions) => {
	const keyPrefix = `${config.REDIS_PREFIX}${options.keyPrefix || "rate-limit:"}`;
	const windowSeconds = Math.ceil(options.windowMs / 1000);

	return async (redis: RedisClient, ip: string, resource: string = "default") => {
		const key = `${keyPrefix}${resource}:${ip}`;
		const result = await redis.set(key, "1", "EX", windowSeconds.toString(), "NX");

		if (result !== "OK") {
			throw new KaitoError(429, "Too Many Requests");
		}
	};
};
