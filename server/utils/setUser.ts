import { NextFunction, Request, Response } from "express";
import AuthKeyDb from "../db/models/auth_key";

export const setUser = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
	const AuthKey = extractToken(req);

	if (AuthKey) {
		const apiKeyFound = await AuthKeyDb.findOne({
			auth_key: AuthKey,
		});

		if (apiKeyFound) {
			req.user = apiKeyFound;
		}
	}

	return next();
};

function extractToken(req: Request): string | null {
	if (req.headers?.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
		return req.headers.authorization.split(" ")[1];
	}

	if (req.query && req.query.token) {
		return req.query.token.toString();
	}

	if (req.body && req.body.token) {
		return req.body.token;
	}

	return null;
}
