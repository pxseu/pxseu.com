import { MessageEmbed } from "discord.js";
import { Request, Response } from "express";
import { WEBHOOK_AVATAR } from "../../../config";
import { makeRequest } from "./makeRequest";

export const postMessage = async (req: Request, res: Response): Promise<void> => {
	const embed = new MessageEmbed();

	if (req.body.attachment) {
		embed.setImage(req.body.attachment);
	}

	if (req.body.message) embed.setDescription(req.body.message);
	embed.setAuthor(req.body.name || "Anonymous", WEBHOOK_AVATAR, "https://pxseu.com/msg");
	embed.setFooter(req.user ? `via ${req.user.name}` : "pls no api abjus, thank!", WEBHOOK_AVATAR);
	embed.setTitle(req.body.message ? "New message!" : "New attachment!");

	embed.setURL("https://pxseu.com/msg");

	embed.setColor("#3399ff");
	embed.setTimestamp();

	try {
		await makeRequest({
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
