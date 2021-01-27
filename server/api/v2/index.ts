import { Router, Response, NextFunction } from "express";
import { RequestWithUser } from "../../../express";
import { sendMessage, isValidMessage } from "./sendMessage";
import { bajoJajo } from "./bajoJajo";

const router = Router();

const methodCheck = {
	post: (req: RequestWithUser, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method != "POST") {
			return res.status(400).json({
				status: 400,
				message: "Method not allowed!",
			});
		}
		next();
	},
	get: (req: RequestWithUser, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method != "GET") {
			return res.status(400).json({
				status: 400,
				message: "Method not allowed!",
			});
		}
		next();
	},
};

router.use("/sendMessage", methodCheck.post, isValidMessage, sendMessage);
router.use("/bajoJajo", methodCheck.get, bajoJajo);

export default router;
