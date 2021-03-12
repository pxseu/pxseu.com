import { NextFunction, Request, Response } from "express";
import { MessageBuilder, Webhook } from "webhook-discord";
import { DEV_MODE, sendMessageLimiter } from "..";
import { RequestWithUser } from "../../../express";
import AuthKeyDb from "../../db/models/auth_key";

const AVATAR = "https://cdn.pxseu.com/btXqULXS9.jpg";

export const sendMessage = async (req: RequestWithUser, res: Response): Promise<void> => {
	const apiUser = req.user;
	const message: string = req.body.message;
	const name: string = req.body.name;

	const Hook = new Webhook(process.env.WEBHOOK ?? "");
	const embed = new MessageBuilder();

	embed.setName("anon chat");
	embed.setAvatar(AVATAR);
	embed.setAuthor(!name ? "Anonymous" : name, AVATAR, "https://pxseu.com/msg");
	embed.setURL("https://pxseu.com/msg");
	embed.setTitle("New message!");
	embed.setDescription(`Content:\n${message}`);
	embed.setColor("#3399ff");
	embed.setFooter(apiUser ? `via ${apiUser}` : "pls no api abjus, thank!", AVATAR);
	embed.setTime();
	Hook.send(embed);

	res.api(200, {
		message,
		user: apiUser?.user,
	});
};

export const isValidMessage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<unknown> => {
	if (!JSON.parse(process.env.ALLOW_SEND_MESSAGE ?? ""))
		return res.api(503, {
			message: "Service disabled.",
		});

	const body: { message: string; name: string } = await req.body;

	body.message = trimText(body.message);
	body.name = trimText(body.name, { noNewLine: true });

	if (!body.message || body.message === "")
		return res.api(400, {
			message: "Cannot send an empty message!",
		});

	if (typeof body.message !== "string")
		return res.api(400, {
			message: "Message should be a string!",
		});

	if (body.name && (typeof body.name !== "string" || body.name === ""))
		return res.api(400, {
			message: "Name should be a string!",
		});

	if (body.message.length > 2000)
		return res.api(413, {
			message: "Message cannot be larger than 2000 characters!",
		});

	if (body.name && body.name.length > 20)
		return res.api(413, {
			message: "Name cannot be longer than 20 characters!",
		});

	const AuthKey = extractToken(req);

	if (AuthKey) {
		const apiKeyFound = await AuthKeyDb.findOne({
			auth_key: AuthKey,
		});

		if (apiKeyFound) {
			req.user = apiKeyFound;
			return next();
		}
	}

	if (DEV_MODE) return next();

	sendMessageLimiter(req, res, next);
};

function extractToken(req: Request): string | null {
	if (req.headers?.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
		return req.headers.authorization.split(" ")[1];
	} else if (req.query && req.query.token) {
		return req.query.token.toString();
	} else if (req.body && req.body.token) {
		return req.body.token;
	}

	return null;
}

function trimText(text: string, options?: { noNewLine: boolean }): string {
	if (typeof text !== "string") return text;

	text = text.replace(/ {2,}/g, " ");

	if (options?.noNewLine === true) {
		text = text.replace(/(\r?\n){1,}/g, "");
	} else {
		text = text.replace(/(\r?\n){3,}/g, "\n\n");
	}

	text = text.trim();
	return text;
}
