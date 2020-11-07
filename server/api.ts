import { Router, Request, Response, NextFunction } from "express";
import { Webhook, MessageBuilder } from "webhook-discord";
import rateLimit from "express-rate-limit";

const router = Router();
const DEV_MODE = process.env.NODE_ENV == "development";

const methodCheck = {
	post: (req: Request, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method != "POST") {
			return res.json({
				error: "Method not allowed!",
			});
		}
		next();
	},
};

const sendMessageLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 1,
	message: {
		error: `Only one message per minute!`,
	},
});

router.use(require("express").json());

router.use(
	"/v1/sendMessage",
	methodCheck.post,
	async (req: Request, res: Response, next: NextFunction) => {
		const body = await req.body;

		if (body.content == undefined || body.content.trim() == "") {
			return res.status(400).json({
				error: "Cannot send emtpy message!",
			});
		}

		if (body.content.trim().length > 2048) {
			return res.status(400).json({
				error: "Message is too large!",
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
		const Hook = new Webhook(process.env.WEBHOOK);
		const embed = new MessageBuilder();

		embed.setName("pxseu messenger");
		embed.setAvatar(
			"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512",
		);
		embed.setAuthor(
			"Anonymous",
			"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512",
			"https://www.pxseu.com/other/message",
		);
		embed.setURL("https://www.pxseu.com/other/message");
		embed.setTitle("New Message!");
		embed.setDescription(`Content: \n${message}`);
		embed.setColor("#3399ff");
		embed.setFooter(
			"pls no api abjus, thank!",
			"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512",
		);
		embed.setTime();
		Hook.send(embed);

		res.json({
			content: message,
		});
	},
);

export default router;
