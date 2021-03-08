import { NextFunction, Request, Response } from "express";
import { MessageBuilder, Webhook } from "webhook-discord";
import { DEV_MODE, isBlacklisted, NOTE, sendMessageLimiter } from "..";
import { RequestWithUser } from "../../../express";
import AuthKeyDb from "../../db/models/auth_key";

const AVATAR = "https://cdn.pxseu.com/assets/pfp.gif?v=2";

export const sendMessage = async (req: RequestWithUser, res: Response): Promise<void> => {
	const user = req.user;
	const message: string = req.body.message;

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
	embed.setAuthor("Anonymous", AVATAR, "https://pxseu.com/msg");
	embed.setURL("https://pxseu.com/msg");
	embed.setTitle("New Message!");
	embed.setDescription(`Content: \n${message}`);
	embed.setColor("#3399ff");
	embed.setFooter(user ? `via ${user}` : "pls no api abjus, thank!", AVATAR);
	embed.setTime();
	Hook.send(embed);

	res.json({
		status: 200,
		message,
		note: NOTE,
		user,
	});
};

export const isValidMessage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
	const body: { message: string } = await req.body;

	body.message = trimText(body.message);

	if (body.message == undefined || body.message == "") {
		const message = "Cannot send empty message!";
		res.status(400).json({
			status: 400,
			message,
			note: NOTE,
		});
		return;
	}

	if (body.message.length > 2000) {
		const message = "Message is too large!";
		res.status(400).json({
			status: 400,
			message,
			note: NOTE,
		});
		return;
	}

	const AuthKey = extractToken(req);

	if (AuthKey) {
		const apiKeyFound = await AuthKeyDb.findOne({
			auth_key: AuthKey,
		});

		if (apiKeyFound) {
			req.user = apiKeyFound.user;
			next();
			return;
		}
	}

	if (DEV_MODE) {
		next();
		return;
	}

	sendMessageLimiter(req, res, next);
};

function extractToken(req: Request): string | null {
	if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
		return req.headers.authorization.split(" ")[1];
	} else if (req.query && req.query.token) {
		return req.query.token.toString();
	} else if (req.body && req.body.token) {
		return req.body.token;
	}

	return null;
}

function trimText(text: string): string {
	text = text.replace(/ {2,}/g, " ");
	text = text.replace(/(\r?\n){3,}/g, "\n\n");
	text = text.trim();
	console.log(text);
	return text;
}
