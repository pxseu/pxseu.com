import { NextFunction, Request, Response } from "express";

export const useApiExtender = (_: Request, res: Response, next: NextFunction): void => {
	res.api = (status, body = {}) => {
		if (status === 204) return res.status(status).send();

		return res.status(status).json({
			...body,
			success: status >= 200 && status < 300,
		});
	};

	return next();
};
