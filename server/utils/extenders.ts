import { Request, Response, NextFunction } from "express";

export const createApiShortcut = (_: Request, res: Response, next: NextFunction) => {
	res.api = (status, body) => {
		return res.status(status).json({
			...body,
			status,
		});
	};
	next();
};
