import { KaitoError } from "@kaito-http/core";
import type { RedisClient } from "bun";
import { config } from "config.js";

interface RateLimitOptions {
	windowMs: number;
	max: number;
	keyPrefix?: string;
}

export const createRateLimiter = (options: RateLimitOptions) => {
	const keyPrefix = `${config.REDIS_PREFIX}${options.keyPrefix || "rate-limit:"}`;

	return async (
		redis: RedisClient,
		ip: string,
		resource: string = "default",
	) => {
		const key = `${keyPrefix}${resource}:${ip}`;

		const current = await redis.get(key);
		const count = current ? parseInt(current, 10) : 0;

		if (count >= options.max) {
			throw new KaitoError(429, "Too Many Requests");
		}

		if (!current) {
			await redis.set(
				key,
				(1).toString(),
				"EX",
				Math.ceil(options.windowMs / 1000),
			);
		} else {
			await redis.incr(key);
		}

		if (count === 0) {
			await redis.expire(key, Math.ceil(options.windowMs / 1000));
		}
	};
};
