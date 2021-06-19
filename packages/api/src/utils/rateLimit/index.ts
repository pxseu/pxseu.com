import { NextFunction, Request, Response } from "express";
import { getRateLimit, getRateLimitReset, setRateLimit, updateRateLimit } from "./helpers";

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

export const rateLimit = ({ amount, resetTime, rateLimitId, message }: RateLimitInteraface): Limiter => {
	if (!amount || amount < 1) throw new Error("Amount must be at least 1");

	return async (req, res, next) => {
		const limit = await getRateLimit(req, rateLimitId);

		const userMaxAmount = req.user ? req.user.rate_limit[rateLimitId].amount : amount;
		const userResetTime = req.user ? req.user.rate_limit[rateLimitId].reset : resetTime;

		res.setHeader("X-RateLimit-Limit", userMaxAmount);

		if (limit === null) {
			res.setHeader("X-RateLimit-Remaining", userMaxAmount - 1);
			await setRateLimit(req, userResetTime, rateLimitId);
			return next();
		}

		if (limit >= userMaxAmount) {
			const { retryAfter, date } = await getRateLimitReset(req, rateLimitId);

			res.setHeader("X-RateLimit-Remaining", 0);
			res.setHeader("X-RateLimit-Reset", date);
			return res.api(429, {
				message: message ? message(userMaxAmount, userResetTime) : "Too many requests!",
				retry_after: retryAfter,
			});
		}

		res.setHeader("X-RateLimit-Remaining", userMaxAmount - limit - 1);
		await updateRateLimit(req, rateLimitId);
		next();
	};
};
