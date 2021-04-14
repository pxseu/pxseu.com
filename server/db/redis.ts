import { createClient } from "redis";
import { promisify } from "util";

const client = createClient({
	url: process.env.REDIS_URL,
	prefix: "pxseu.com:",
});

export const redis = {
	setAsync: promisify(client.setex).bind(client),
	getAsync: promisify(client.get).bind(client),
	deleteAsync: promisify(client.del).bind(client),
	incrAsync: promisify(client.incr).bind(client),
	ttlAsync: promisify(client.pttl).bind(client),
};
