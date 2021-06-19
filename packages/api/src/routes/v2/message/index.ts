import { NextFunction, Request, Response, Router } from "express";
import { DEV } from "../../../config";
import { rateLimit } from "../../../utils/rateLimit";
import { validateMessage } from "./bodyValidator";
import { postMessage } from "./postMessage";

export const router = Router();

const rateLimiter = rateLimit({
	amount: 1,
	rateLimitId: "sendMessage",
	resetTime: 10,
	message: (amount, time) => `You can only send ${amount} message(s) per ${time} second(s)`,
});

const limiter = (req: Request, res: Response, next: NextFunction) => {
	if (DEV) return next();

	rateLimiter(req, res, next);
};

router.post("/", validateMessage, limiter, postMessage);
