import { Router, Request, Response, NextFunction } from "express";
import { DEV_MODE, isBlacklisted, sendMessageLimiter } from "..";
import { Webhook, MessageBuilder } from "webhook-discord";

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
			note: "DEPRECATION WARNING: USE V2",
		});
	},
);

export default router;
