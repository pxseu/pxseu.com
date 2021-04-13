import { MessageEmbed, WebhookClient, WebhookMessageOptions } from "discord.js";
import { Router } from "express";
import { postMessage, validateMessage } from "./sendMessagePost";

export const AVATAR = "https://cdn.pxseu.com/wgzWy1U9f.png";
export const client = new WebhookClient(process.env.WEBHOOK_MESSAGE_ID ?? "", process.env.WEBHOOK_MESSAGE_TOKEN ?? "", {
	disableMentions: "everyone",
});

export const embedWithBase = (embed: MessageEmbed): WebhookMessageOptions => {
	return {
		username: "anon chat",
		avatarURL: AVATAR,
		embeds: [embed],
	};
};

export const router = Router();

router.post("/", validateMessage, postMessage);
