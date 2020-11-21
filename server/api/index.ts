import { Router, Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import v1 from "./v1";
import v2 from "./v2";
import { blacklist, spaces } from "../config";

const router = Router();

export const DEV_MODE = process.env.NODE_ENV == "development";
export const NOTE = "pls no api abjus, thank!";

export const sendMessageLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 1,
	message: {
		status: 429,
		message: `Only one message per minute!`,
		error: `Only one message per minute!`,
	},
});

export const isBlacklisted = (message: string) => {
	let cleanMessage = message;

	spaces.forEach((space) => {
		cleanMessage = cleanMessage.replace(new RegExp(space, "gi"), "");
	});

	return blacklist.some((word) => cleanMessage.match(new RegExp(word, "gi")))
		? true
		: false;
};

router.use(require("express").json());

router.use("/v1", v1);
router.use("/v2", v2);

export default router;
