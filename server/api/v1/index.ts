import { Router, Request, Response, NextFunction } from "express";
import { DEV_MODE, isBlacklisted, sendMessageLimiter } from "..";
import { Webhook, MessageBuilder } from "webhook-discord";

const AVATAR = "https://cdn.pxseu.com/assets/pfp.gif?v=2";
const router = Router();

const methodCheck = {
	post: (req: Request, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method != "POST") {
			return res.status(400).json({
				status: 400,
				message: "Method not allowed!",
			});
		}
		next();
	},
};

router.use(
	"/sendMessage",
	methodCheck.post,
	async (req: Request, res: Response, next: NextFunction) => {
		const body = await req.body;

		if (body.content == undefined || body.content.trim() == "") {
			return res.status(400).json({
				error: "Cannot send emtpy message!",
				note: "DEPRECATION WARNING: USE V2",
			});
		}

		if (body.content.trim().length > 2048) {
			return res.status(400).json({
				error: "Message is too large!",
				note: "DEPRECATION WARNING: USE V2",
			});
		}

		if (DEV_MODE) {
			next();
			return;
		}
		sendMessageLimiter(req, res, next);
	},
	async (req: Request, res: Response) => {
		const message: string = await req.body.content.trim();

		if (isBlacklisted(message)) {
			return res.json({
				status: 400,
				error: "You said a word from the blacklist!",
			});
		}

		const Hook = new Webhook(process.env.WEBHOOK ?? "");
		const embed = new MessageBuilder();

		embed.setName("pxseu messenger");
		embed.setAvatar(AVATAR);
		embed.setAuthor("Anonymous", AVATAR, "https://www.pxseu.com/other/message");
		embed.setURL("https://www.pxseu.com/other/message");
		embed.setTitle("New Message!");
		embed.setDescription(`Content: \n${message}`);
		embed.setColor("#3399ff");
		embed.setFooter("pls no api abjus, thank!", AVATAR);
		embed.setTime();
		Hook.send(embed);

		res.json({
			content: message,
			note: "DEPRECATION WARNING: USE V2",
		});
	}
);

export default router;
