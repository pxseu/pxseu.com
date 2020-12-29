import { NextFunction, Response } from "express";
import { MessageBuilder, Webhook } from "webhook-discord";
import { DEV_MODE, isBlacklisted, NOTE, sendMessageLimiter } from "..";
import { RequestWithUser } from "../../../express";
import AuthKeyDb, { apiUser } from "../../db/models/auth_key";

const AVATAR = "https://cdn.pxseu.com/assets/pfp.gif";

export const sendMessage = async (req: RequestWithUser, res: Response): Promise<void> => {
	const user = req.user;
	const message: string = await req.body.message.trim();

	if (isBlacklisted(message)) {
		res.json({
			status: 400,
			error: "You said a word from the blacklist!",
		});
		return;
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
		status: 200,
		message,
		note: NOTE,
		user,
	});
};

export const isValidMessage = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const body: { message: string } = await req.body;

	const AuthKey = req.headers.authorization;

	const apiKeyFound = (await AuthKeyDb.findOne({
		auth_key: AuthKey,
	})) as apiUser;

	if (body.message == undefined || body.message.trim() == "") {
		const message = "Cannot send empty message!";
		res.status(400).json({
			status: 400,
			message,
			error: `${message} (please update your API to read the 'message' filed and not 'content')`,
			note: NOTE,
		});
		return;
	}

	if (body.message.trim().length > 2048) {
		const message = "Message is too large!";
		res.status(400).json({
			status: 400,
			message,
			error: `${message} (please update your API to read the message filed)`,
			note: NOTE,
		});
		return;
	}

	if (apiKeyFound) {
		req.user = apiKeyFound.user;
		next();
	}

	if (DEV_MODE) {
		next();
		return;
	}

	sendMessageLimiter(req, res, next);
};
