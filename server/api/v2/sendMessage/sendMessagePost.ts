import { MessageEmbed } from "discord.js";
import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import * as yup from "yup";
import { client, AVATAR, embedWithBase } from ".";
import { DEV_MODE } from "../../";
import { RequestWithUser } from "../../../../express";
import AuthKeyDb from "../../../db/models/auth_key";

const sendMessageLimiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 1 per 30 s
	max: 1,
	message: {
		status: 429,
		message: `Only one message per 30s!`,
	},
});

interface BodyType {
	message?: string;
	name?: string;
	attachment?: string;
}

const schema = yup.object().shape({
	message: yup.string().test("lenght", "The message cannot be logner than 2000", (value) => {
		if (!value) return true;

		return value.length <= 2000;
	}),
	name: yup.string().test("lenght", "The name cannot be longer than 20 characters", (value) => {
		if (!value) return true;

		return value.length <= 20;
	}),
	attachment: yup
		.string()
		.url()
		.test("lenght", "The attachment cannot be longer than 200 characters", (value) => {
			if (!value) return true;

			return value.length <= 200;
		}),
});

export const validateMessage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<unknown> => {
	if (!JSON.parse(process.env.ALLOW_SEND_MESSAGE ?? ""))
		return res.api(503, {
			message: "Service disabled.",
		});

	try {
		await schema.validate(req.body);
	} catch (error) {
		if (error?.name !== "ValidationError")
			return res.api(500, {
				message: "There was an internal server error",
			});

		return res.api(400, {
			message: capitalize(error.message),
		});
	}

	// nullify shit
	if (!req.body.name) req.body.name = null;
	if (!req.body.message) req.body.message = null;
	if (!req.body.attachment) req.body.attachment = null;

	if (req.body.attachment === null && req.body.message === null)
		return res.api(400, { message: "You must provide a message or an attachment" });

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

export const postMessage = async (req: RequestWithUser, res: Response): Promise<void> => {
	const embed = new MessageEmbed();

	if (req.body.attachment) {
		embed.setImage(req.body.attachment);
	}

	req.body.message && embed.setDescription(`Content:\n${req.body.message}`);
	embed.setAuthor(req.body.name ? req.body.name : "Anonymous", AVATAR, "https://pxseu.com/msg");
	embed.setFooter(req.user ? `via ${req.user.name}` : "pls no api abjus, thank!", AVATAR);
	embed.setTitle(req.body.message ? "New message!" : "New attachment!");

	embed.setURL("https://pxseu.com/msg");

	embed.setColor("#3399ff");
	embed.setTimestamp();

	try {
		await client.send(req.body.attachment ? `Attachment: ${req.body.attachment}` : undefined, embedWithBase(embed));

		res.api(200, {
			message: "Message was delievered",
			user: req.user?.name,
		});
	} catch (e) {
		res.api(500, {
			message: "Failed to deliver the message.",
			user: req.user?.name,
		});
	}
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

const capitalize = (s: string): string => {
	if (typeof s !== "string") return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
};
