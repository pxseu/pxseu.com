import Redis from "ioredis";
import { API_HOSTNAME, REDIS_HOST, REDIS_PORT } from "../../config";

export const redis = new Redis({
	keyPrefix: `${API_HOSTNAME}:`,
	host: REDIS_HOST,
	port: REDIS_PORT,
});

redis.on("error", (error) => {
	console.error("REDIS:", error?.message);
});
