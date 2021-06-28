import express, { NextFunction, Request, Response } from "express";
import { IncomingMessage } from "http";


function getRawBody(req: IncomingMessage, _: never, buf: Buffer) {
	// @ts-expect-error lazy
	req.rawBody = buf.toString();
}

export const parser = (req: Request, res: Response, next: NextFunction) => {
	express.json({
		verify: getRawBody,
	})(req, res, (err) => {
		if (!err) return next();

		res.api(400, { message: "Your JSON request could not be parsed." });
	});
};
