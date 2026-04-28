import { k } from "@kaito-http/core";

const configSchema = k.object({
	SPOTIFY_CLIENT_ID: k.string(),
	SPOTIFY_CLIENT_SECRET: k.string(),
	SPOTIFY_REDIRECT_URI: k.string().uri(),
	SPOTIFY_AUTH_USER_ID: k
		.string()
		.optional()
		.default("1evum6fq9klvekqjbz4cu5v79"),
	REDIS_URL: k.string().uri(),
	PORT: k.coerce.number().default(3001),
	LOCATION_SECRET:
		process.env.NODE_ENV === "production"
			? k.string().min(10)
			: k.string().min(10).default("sigmaSigmaSigma"),
	WEBHOOK_MESSAGE_ID: k.string(),
	WEBHOOK_MESSAGE_TOKEN: k.string(),
	WEBHOOK_AVATAR: k
		.string()
		.uri()
		.default("https://cdn.pxseu.com/Nc4z2WvoV.png"),
	REDIS_PREFIX: k.string().default("pxseu:2:"),
});

export const config = configSchema.parse(process.env);
