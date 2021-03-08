import express, { Router } from "express";
import rateLimit from "express-rate-limit";
import v2 from "./v2";
import { blacklist, spaces } from "../config";
import { IncomingMessage } from "node:http";

const router = Router();

export const DEV_MODE = process.env.NODE_ENV == "development";
export const NOTE = "pls no api abjus, thank!";

export const sendMessageLimiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 1 per 30 s
	max: 1,
	message: {
		status: 429,
		message: `Only one message per 30s!`,
	},
});

export const isBlacklisted = (message: string): boolean => {
	let cleanMessage = message;

	spaces.forEach((space) => {
		cleanMessage = cleanMessage.replace(new RegExp(space, "gi"), "");
	});

	return blacklist.some((word) => cleanMessage.match(new RegExp(word, "gi")));
};

router.use((req, res, next) => {
	express.json({
		verify: getRawBody,
	})(req, res, (err) => {
		if (err) {
			console.log(err);
			res.status(400).json({
				status: 400,
				message: "Your JSON request could not be parsed.",
			});
			return;
		}
		next();
	});
});

router.use("/v2", v2);

router.use((_, res) => {
	res.json({
		status: 404,
		message: "Not found",
	});
});

export default router;

function getRawBody(req: IncomingMessage, _: never, buf: Buffer) {
	// @ts-expect-error lazy
	req.rawBody = buf.toString();
}
