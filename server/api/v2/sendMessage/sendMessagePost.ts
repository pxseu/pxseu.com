import { MessageEmbed } from "discord.js";
import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { AVATAR, client, embedWithBase } from ".";
// import { DEV_MODE } from "../../";
import { rateLimit } from "../../../utils/rateLimit";

const rateLimiter = rateLimit({
	ammount: 1,
	rateLimitId: "sendMessage",
	resetTime: 10,
	message: (ammount, time) => `You can only send ${ammount} message(s) per ${time} second(s)`,
});

const schema = yup.object().shape({
	message: yup
		.string()
		.test("lenght", "The message cannot be logner than 2000", (value) => {
			if (!value) return true;

			return value.length <= 2000;
		})
		.nullable(),
	name: yup
		.string()
		.test("lenght", "The name cannot be longer than 128 characters", (value) => {
			if (!value) return true;

			return value.length <= 128;
		})
		.nullable(),
	attachment: yup
		.string()
		.url()
		.test("lenght", "The attachment cannot be longer than 200 characters", (value) => {
			if (!value) return true;

			return value.length <= 200;
		})
		.nullable(),
});

export const validateMessage = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
	if (!JSON.parse(process.env.ALLOW_SEND_MESSAGE ?? ""))
		return res.api(503, {
			message: "Service disabled.",
		});

	try {
		await schema.validate(req.body);
	} catch (error) {
		if (error instanceof yup.ValidationError)
			return res.api(400, {
				message: capitalize(error.errors.join(", ")),
			});

		return res.api(500, {
			message: "Something broke idk",
		});
	}

	// nullify shit
	if (!req.body.name) req.body.name = null;
	if (!req.body.message) req.body.message = null;
	if (!req.body.attachment) req.body.attachment = null;

	if (req.body.attachment === null && req.body.message === null)
		return res.api(400, { message: "You must provide a message or an attachment" });

	// if (DEV_MODE) return next();

	return rateLimiter(req, res, next);
};

export const postMessage = async (req: Request, res: Response): Promise<void> => {
	const embed = new MessageEmbed();

	if (req.body.attachment) {
		embed.setImage(req.body.attachment);
	}

	req.body.message && embed.setDescription(req.body.message);
	embed.setAuthor(req.body.name || "Anonymous", AVATAR, "https://pxseu.com/msg");
	embed.setFooter(req.user ? `via ${req.user.name}` : "pls no api abjus, thank!", AVATAR);
	embed.setTitle(req.body.message ? "New message!" : "New attachment!");

	embed.setURL("https://pxseu.com/msg");

	embed.setColor("#3399ff");
	embed.setTimestamp();

	try {
		await client.send(req.body.message);
		await client.send(req.body.attachment ? `Attachment: ${req.body.attachment}` : undefined, embedWithBase(embed));

		res.api(200, {
			message: "Message was delievered",
			user: req.user?.name,
		});
	} catch (e: unknown) {
		res.api(500, {
			message: "Failed to deliver the message.",
			user: req.user?.name,
		});
	}
};

const capitalize = (s: string): string => {
	if (typeof s !== "string") return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
};
