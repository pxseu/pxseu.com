import { NextFunction, Request, Response } from "express";
import { redis } from "../db/redis";

interface RateLimitInteraface {
	/**
	 *  Ammount of requests allowed to be made before reteLimit is reached
	 */
	ammount: number;

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

interface SetRateLimit {
	ammount: number;
	resetTime: number;
}

const setRateLimit = async (req: Request, { ammount, resetTime }: SetRateLimit, rateLimitId: string) => {
	await redis.setAsync(
		createKey(req, rateLimitId),
		resetTime,
		// @ts-expect-error dfghdfdfhdfh
		(req.user ? req.user.rate_limit[rateLimitId] : ammount - 1).toString()
	);
};

const updateRateLimit = async (req: Request, rateLimitId: string) => {
	await redis.decrAsync(createKey(req, rateLimitId));
};

export const rateLimit = ({ ammount, resetTime, rateLimitId, message }: RateLimitInteraface): Limiter => {
	if (ammount < 1) throw new Error("Ammount must be at least 1");

	return async (req, res, next) => {
		const rateLimit = await getRateLimit(req, rateLimitId);

		console.log(rateLimit);

		if (rateLimit === null) {
			await setRateLimit(req, { ammount, resetTime }, rateLimitId);
			return next();
		}

		if (rateLimit <= 0) {
			return res.api(429, { message: message ? message(ammount, resetTime) : "Too many requests!" });
		}

		await updateRateLimit(req, rateLimitId);
		return next();
	};
};
