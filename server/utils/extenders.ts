import { NextFunction, Request, Response } from "express";

export const useApiExtender = (_: Request, res: Response, next: NextFunction): void => {
	res.api = (status, body) => {
		return res.status(status).json({
			...body,
			status,
		});
	};
	next();
};
