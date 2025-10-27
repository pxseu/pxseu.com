import z from "zod";

export const configSchema = z.object({
	SPOTIFY_CLIENT_ID: z.string(),
	SPOTIFY_CLIENT_SECRET: z.string(),
	SPOTIFY_REDIRECT_URI: z.string().url(),
	SPOTIFY_AUTH_USER_ID: z
		.string()
		.optional()
		.default("1evum6fq9klvekqjbz4cu5v79"),
	REDIS_URL: z.string().url(),
	PORT: z.coerce.number().default(3001),
	LOCATION_SECRET: z.string().min(10).default("sigmaSigmaSigma"),
	WEBHOOK_MESSAGE_ID: z.string(),
	WEBHOOK_MESSAGE_TOKEN: z.string(),
	WEBHOOK_AVATAR: z
		.string()
		.url()
		.default("https://cdn.pxseu.com/Nc4z2WvoV.png"),
	REDIS_PREFIX: z.string().default("pxseu:2:"),
});

export const config = configSchema.parse(process.env);
