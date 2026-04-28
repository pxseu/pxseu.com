import { KaitoError, k } from "@kaito-http/core";
import { kaito } from "../context.js";
import { createRateLimiter } from "../utils/ratelimit.js";

const rateLimiter = createRateLimiter({
	windowMs: 10 * 1000, // 10 seconds
	max: 1,
	keyPrefix: "rate-limit:message:",
});

export const routes = kaito
	.pipe(async (ctx) => {
		await rateLimiter(ctx.clients.redis, ctx.ip);

		return ctx;
	})
	.post("/", {
		body: k.object({
			content: k.string().max(2000).nullish(),
			name: k.string().max(128).nullish(),
			attachment: k.string().uri().max(200).nullish(),
		}),
		run: async ({ ctx, body }) => {
			if (!body.content && !body.attachment) {
				throw new KaitoError(400, "Content or attachment is required");
			}

			await ctx.clients.discord.sendMessage(body);

			return {
				message: "Message sent",
			};
		},
	});
