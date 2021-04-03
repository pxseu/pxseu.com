import { NextFunction, Request, Response } from "express";
import { MessageBuilder, Webhook } from "webhook-discord";
import { DEV_MODE } from "..";
import rateLimit from "express-rate-limit";
import { RequestWithUser } from "../../../express";
import AuthKeyDb from "../../db/models/auth_key";

const AVATAR = "https://cdn.pxseu.com/5As8jItIj.jpg";

const sendMessageLimiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 1 per 30 s
	max: 1,
	message: {
		status: 429,
		message: `Only one message per 30s!`,
	},
});

interface BodyTypes {
	message: string;
	name: string;
	attachment: string;
}

export const sendMessage = async (req: RequestWithUser, res: Response): Promise<void> => {
	const apiUser = req.user;
	const message: string = req.body.message;
	const name: string = req.body.name;
	const embedUrl = req.body.attachment;

	const Hook = new Webhook(process.env.WEBHOOK_MESSAGE ?? "");
	const embed = new MessageBuilder();

	embedUrl && embed.setText(`Attachment: ${embedUrl}`);
	embedUrl && embed.setImage(embedUrl);
	message && embed.setDescription(`Content:\n${message}`);
	embed.setAuthor(name ? name : "Anonymous", AVATAR, "https://pxseu.com/msg");
	embed.setFooter(apiUser ? `via ${apiUser.name}` : "pls no api abjus, thank!", AVATAR);
	embed.setTitle(message ? "New message!" : "New attachment!");

	embed.setName("anon chat");
	embed.setAvatar(AVATAR);
	embed.setURL("https://pxseu.com/msg");

	embed.setColor("#3399ff");
	embed.setTime();

	Hook.send(embed);

	res.api(200, {
		message,
		user: apiUser?.name,
	});
};

export const isValidMessage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<unknown> => {
	if (!JSON.parse(process.env.ALLOW_SEND_MESSAGE ?? ""))
		return res.api(503, {
			message: "Service disabled.",
		});

	const body: BodyTypes = req.body;

	let isBodyOrAttachment = false;

	body.message = trimText(body.message);
	body.name = trimText(body.name, { noNewLine: true });
	body.attachment = trimText(body.attachment);

	if (body.message) isBodyOrAttachment = true;

	if (body.message && typeof body.message !== "string")
		return res.api(400, {
			message: "Message should be a string",
		});

	if (body.message && body.message.length > 2000)
		return res.api(413, {
			message: "Message cannot be larger than 2000 characters",
		});

	if (body.name && (typeof body.name !== "string" || body.name === ""))
		return res.api(400, {
			message: "Name should be a string",
		});

	if (body.name && body.name.length > 20)
		return res.api(413, {
			message: "Name cannot be longer than 20 characters",
		});

	if (body.attachment && typeof body?.attachment !== "string")
		return res.api(400, {
			message: "Attachment should be a URL in a string form",
		});

	if (body.attachment && body.attachment.length > 200)
		return res.api(400, {
			message: "Attachment a URL cannot be longer than 200 characters",
		});

	if (body.attachment)
		try {
			const url = new URL(body.attachment);

			// Make sure that it's url encoded so it doesn't crash
			body.attachment = url.toString();
			isBodyOrAttachment = true;
		} catch {
			return res.api(400, {
				message: "Attachment must be a valid URL",
			});
		}

	if (!isBodyOrAttachment)
		return res.api(400, {
			message: "Attachment or Message must be provided",
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
	}

	if (req.query && req.query.token) {
		return req.query.token.toString();
	}

	if (req.body && req.body.token) {
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
