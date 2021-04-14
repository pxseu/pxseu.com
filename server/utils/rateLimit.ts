import { NextFunction, Request, Response } from "express";
import { redis } from "../db/redis";

interface RateLimitInteraface {
	/**
	 *  Amount of requests allowed to be made before reteLimit is reached
	 */
	amount: number;

	/**
	 *  In seconds
	 */
	resetTime: number;

	/**
	 * 	Should be the endpoint, this will be a base of the rateLimits
	 */
	rateLimitId: string;

	/**
	 *  Custom message to be sent when the limit is reached
	 */
	message?: (ammount: number, time: number) => string;
}

type Limiter = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

const createKey = (req: Request, rateLimitId: string) =>
	`rate_limit:${encodeURIComponent(rateLimitId)}:${encodeURIComponent(req.user ? req.user.auth_key : req.ip)}`;

const getRateLimit = async (req: Request, rateLimitId: string): Promise<number | null> => {
	const rateLimitInRedis = await redis.getAsync(createKey(req, rateLimitId));

	if (!rateLimitInRedis) return null;

	return parseInt(rateLimitInRedis);
};

const setRateLimit = async (req: Request, resetTime: number, rateLimitId: string) => {
	await redis.setAsync(createKey(req, rateLimitId), resetTime, (1).toString());
};

const updateRateLimit = async (req: Request, rateLimitId: string) => {
	await redis.incrAsync(createKey(req, rateLimitId));
};

const getRateLimitReset = async (req: Request, rateLimitId: string) => {
	const ttl = await redis.ttlAsync(createKey(req, rateLimitId));

	let date = new Date(new Date().toUTCString());
	date = new Date(date.getTime() + ttl);

	return { date: Math.ceil(date.getTime() / 1000), retry_after: ttl / 1000 };
};

export const rateLimit = ({ amount, resetTime, rateLimitId, message }: RateLimitInteraface): Limiter => {
	if (amount < 1) throw new Error("Amount must be at least 1");

	return async (req, res, next) => {
		const rateLimit = await getRateLimit(req, rateLimitId);

		const userMaxAmount = req.user ? req.user.rate_limit[rateLimitId].amount : amount;
		const userResetTime = req.user ? req.user.rate_limit[rateLimitId].reset : resetTime;

		res.setHeader("X-RateLimit-Limit", userMaxAmount);

		if (rateLimit === null) {
			res.setHeader("X-RateLimit-Remaining", userMaxAmount - 1);
			await setRateLimit(req, userResetTime, rateLimitId);
			return next();
		}

		if (rateLimit >= userMaxAmount) {
			const { retry_after, date } = await getRateLimitReset(req, rateLimitId);

			res.setHeader("X-RateLimit-Remaining", 0);
			res.setHeader("X-RateLimit-Reset", date);
			return res.api(429, {
				message: message ? message(userMaxAmount, userResetTime) : "Too many requests!",
				retry_after,
			});
		}

		res.setHeader("X-RateLimit-Remaining", userMaxAmount - rateLimit - 1);
		await updateRateLimit(req, rateLimitId);
		return next();
	};
};
