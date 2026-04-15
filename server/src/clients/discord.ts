import type { RedisClient } from "bun";
import { config } from "config.js";
import { fetch } from "./fetch.js";

const ENDPOINT = "https://canary.discord.com/api/webhooks";
const REDIS_PREFIX = `${config.REDIS_PREFIX}discord_webhook_ratelimit`;

interface DiscordEmbedAuthor {
	name: string;
	icon_url: string;
	url: string;
}

interface DiscordEmbedFooter {
	text: string;
	icon_url: string;
}

interface DiscordEmbed {
	description?: string;
	image?: { url: string };
	author: DiscordEmbedAuthor;
	footer: DiscordEmbedFooter;
	title: string;
	url: string;
	color: number;
	timestamp: string;
}

export class DiscordClient {
	constructor(
		private redis: RedisClient,
		private webhookId: string,
		private webhookToken: string,
		private avatar: string,
	) {}

	async sendMessage(body: {
		content?: string | null;
		name?: string | null;
		attachment?: string | null;
	}) {
		const embed: DiscordEmbed = {
			description: body.content || undefined,
			image: body.attachment ? { url: body.attachment } : undefined,
			author: {
				name: body.name || "Anonymous",
				icon_url: this.avatar,
				url: "https://pxseu.com/message",
			},
			footer: {
				text: "pls no api abjus, thank!",
				icon_url: this.avatar,
			},
			title: body.content ? "New message!" : "New attachment!",
			url: "https://pxseu.com/message",
			color: 3381759,
			timestamp: new Date().toISOString(),
		};

		const [left, delay] = await Promise.all([
			this.redis.get(`${REDIS_PREFIX}:left`),
			this.redis.ttl(`${REDIS_PREFIX}:left`),
		]);

		if (left && delay > 0) Bun.sleep((delay + 0.1 * 1000) / parseInt(left, 10));

		const res = await fetch(
			`${ENDPOINT}/${this.webhookId}/${this.webhookToken}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: body.attachment
						? `Attachment: ${body.attachment}`
						: undefined,
					username: "anon chat",
					avatar_url: this.avatar,
					embeds: [embed],
				}),
			},
		);

		if (res.ok && res.headers) {
			const resRemaining = res.headers.get("x-ratelimit-remaining");
			const resResetAfter = res.headers.get("x-ratelimit-reset-after");

			if (resRemaining && resResetAfter) {
				const exp = parseInt(resResetAfter, 10);
				this.redis.setex(`${REDIS_PREFIX}:left`, exp, resRemaining);
			}
		}

		if (res.ok && res.status !== 204) return res.json();
		if (res.ok) return;

		throw new Error(res.statusText);
	}
}
