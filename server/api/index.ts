import express, { Router } from "express";
import { IncomingMessage } from "node:http";
import { setUser } from "../utils/setUser";
import {router as v2} from "./v2";

export const router = Router();

export const DEV_MODE = process.env.NODE_ENV == "development";

router.use((req, res, next) => {
	express.json({
		verify: getRawBody,
	})(req, res, (err) => {
		if (!err) return next();

		res.api(400, { message: "Your JSON request could not be parsed." });
	});
});

router.use(setUser);

router.use("/v2", v2);

router.use((_, res) => {
	res.api(404, {
		message: "Not found",
	});
});

function getRawBody(req: IncomingMessage, _: never, buf: Buffer) {
	// @ts-expect-error lazy
	req.rawBody = buf.toString();
}
