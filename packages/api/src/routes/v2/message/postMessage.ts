import { Request, Response } from "express";
import { WEBHOOK_AVATAR } from "../../../config";
import { Embed } from "./Embed";
import { makeRequest } from "./makeRequest";

export const postMessage = async (req: Request, res: Response): Promise<void> => {
	const url = "https://pxseu.com/message";
	const embed = new Embed();

	if (req.body.attachment) embed.image.url = req.body.attachment;
	if (req.body.message) embed.description = req.body.message;

	embed.author = {
		name: req.body.name || "Anonymous",
		icon_url: WEBHOOK_AVATAR,
		url,
	};

	embed.footer = {
		text: req.user ? `via ${req.user.name}` : "pls no api abjus, thank!",
		icon_url: WEBHOOK_AVATAR,
	};

	embed.title = req.body.message ? "New message!" : "New attachment!";
	embed.url = url;

	embed.color = 3381759;
	embed.timestamp = new Date().toISOString();

	try {
		await makeRequest({
			content: req.body.attachment ? `Attachment: ${req.body.attachment}` : undefined,
			username: "anon chat",
			avatar_url: WEBHOOK_AVATAR,
			embeds: [embed],
		});

		res.api(200, {
			message: "Message was delivered",
			user: req.user?.name,
		});
	} catch (e: unknown) {
		res.api(500, {
			message: "Failed to deliver message",
			// error: e instanceof Error ? `Internal: ${e.message}` : undefined,
			user: req.user?.name,
		});
	}
};
