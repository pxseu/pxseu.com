import { Router, Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import v1 from "./v1";
import v2 from "./v2";

const router = Router();

export const DEV_MODE = process.env.NODE_ENV == "development";
export const NOTE = "pls no api abjus, thank!";

export const methodCheck = {
	post: (req: Request, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method != "POST") {
			return res.status(400).json({
				status: 400,
				message: "Method not allowed!",
			});
		}
		next();
	},
};

export const sendMessageLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 1,
	message: {
		status: 429,
		message: `Only one message per minute!`,
		error: `Only one message per minute!`,
	},
});

router.use(require("express").json());

router.use("v1", v1);
router.use("v2", v2);

export default router;
