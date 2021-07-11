import fetch from "node-fetch";
import { WEBHOOK_MESSAGE_ID, WEBHOOK_MESSAGE_TOKEN } from "../../../config";
import { redis } from "../../../db/redis";

const ENDPOINT = "https://canary.discord.com/api/webhooks";
const REDIS_PREFIX = "discord_webhook_ratelimit";

// @TODO: Make useage of the rate limit bellow too

// const AMMOUNT = 30;
// const TIME = 60; // seconds

async function sleep(time: number) {
	await new Promise((resolve) => setTimeout(resolve, time * 1000));
}

export const makeRequest = async (body: Record<string, any>) => {
	const left = await redis.get(`${REDIS_PREFIX}:left`);
	const delay = await redis.ttl(`${REDIS_PREFIX}:left`);

	let res;

	if (left && delay > 0) sleep((delay + 0.1 * 1000) / parseInt(left, 10));

	try {
		res = await fetch(`${ENDPOINT}/${WEBHOOK_MESSAGE_ID}/${WEBHOOK_MESSAGE_TOKEN}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	} catch (error) {
		throw new Error("Failed to make the request");
	}

	if (res.ok && res.headers) {
		const resRemaining = res.headers.get("x-ratelimit-remaining") as string;
		const resResetAfter = res.headers.get("x-ratelimit-reset-after") as string;
		const exp = parseInt(resResetAfter, 10);
		redis.setex(`${REDIS_PREFIX}:left`, exp, resRemaining);
	}

	if (res.ok && res.status !== 204) return res.json();
	if (!res.ok) throw new Error(res.statusText);
};
