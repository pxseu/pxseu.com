import { Response, NextFunction } from "express";
import { RequestWithUser } from "../../express";

export const methodCheck = {
	post: (req: RequestWithUser, res: Response, next: NextFunction): void => {
		const method = req.method;

		if (method === "POST") return next();

		res.api(405, {
			message: "Method not allowed!",
		});
	},
	get: (req: RequestWithUser, res: Response, next: NextFunction): void => {
		const method = req.method;

		if (method === "GET") return next();

		res.api(405, {
			message: "Method not allowed!",
		});
	},
};
