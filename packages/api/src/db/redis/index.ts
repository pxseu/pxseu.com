import Redis from "ioredis";
import { HOSTNAME } from "../../config";

export const redis = new Redis({
	keyPrefix: `${HOSTNAME}:`,
});
