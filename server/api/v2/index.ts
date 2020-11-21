import { Router, Response, NextFunction } from "express";
import { NOTE, DEV_MODE, sendMessageLimiter } from "..";
import AuthKeyDb from "../../db/models/auth_key";
import { RequestWithUser } from "../../../express";
import { Webhook, MessageBuilder } from "webhook-discord";
import { blacklist, spaces } from "..";

const AVATAR =
	"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=4096";

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
};

router.use(
	"/sendMessage",
	methodCheck.post,
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const body: { message: string } = await req.body;

		const AuthKey = req.headers.authorization;

		const apiKeyFound = await AuthKeyDb.findOne({
			auth_key: AuthKey,
		});

		if (body.message == undefined || body.message.trim() == "") {
			const message = "Cannot send empty message!";
			return res.status(400).json({
				status: 400,
				message,
				error: `${message} (please update your API to read the 'message' filed and not 'content')`,
				note: NOTE,
			});
		}

		if (body.message.trim().length > 2048) {
			const message = "Message is too large!";
			return res.status(400).json({
				status: 400,
				message,
				error: `${message} (please update your API to read the message filed)`,
				note: NOTE,
			});
		}

		if (apiKeyFound) {
			req.user = (await apiKeyFound.toJSON()).user;
			next();
		}

		if (DEV_MODE) {
			next();
			return;
		}

		sendMessageLimiter(req, res, next);
	},
	async (req: RequestWithUser, res: Response) => {
		const user = req.user;
		const message: string = await req.body.message.trim();
		let cleanMessage = message;

		spaces.forEach((space) => {
			cleanMessage = cleanMessage.replaceAll(space, "");
		})

		if (
			blacklist.some((word) =>
				message.split(" ").join("").match(new RegExp(word, "gi")),
			)
		) {
			return res.json({
				status: 400,
				message: "You said a word from the blacklist!",
				note: NOTE,
				user,
			});
		}

		const Hook = new Webhook(process.env.WEBHOOK ?? "");
		const embed = new MessageBuilder();

		embed.setName("pxseu messenger");
		embed.setAvatar(AVATAR);
		embed.setAuthor(
			"Anonymous",
			AVATAR,
			"https://www.pxseu.com/other/message",
		);
		embed.setURL("https://www.pxseu.com/other/message");
		embed.setTitle("New Message!");
		embed.setDescription(`Content: \n${message}`);
		embed.setColor("#3399ff");
		embed.setFooter("pls no api abjus, thank!", AVATAR);
		embed.setTime();
		Hook.send(embed);

		res.json({
			status: 200,
			message,
			note: NOTE,
			user,
		});
	},
);

export default router;
