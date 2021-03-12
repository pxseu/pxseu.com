import { Router, Response, NextFunction } from "express";
import { RequestWithUser } from "../../../express";
import { sendMessage, isValidMessage } from "./sendMessage";
import { bajoJajo } from "./bajoJajo";

const router = Router();

const methodCheck = {
	post: (req: RequestWithUser, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method === "POST") return next();

		res.status(400).json({
			status: 400,
			message: "Method not allowed!",
		});
	},
	get: (req: RequestWithUser, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method === "GET") return next();

		res.status(400).json({
			status: 400,
			message: "Method not allowed!",
		});
	},
};

router.use("/sendMessage", methodCheck.post, isValidMessage, sendMessage);
router.use("/bajoJajo", methodCheck.get, bajoJajo);

export default router;
