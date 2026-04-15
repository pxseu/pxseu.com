import { KaitoError } from "@kaito-http/core";
import { z } from "zod";
import { router } from "../context.js";
import { createRateLimiter } from "../utils/ratelimit.js";

const rateLimiter = createRateLimiter({
	windowMs: 10 * 1000, // 10 seconds
	max: 1,
	keyPrefix: "rate-limit:message:",
});

export const routes = router()
	.through(async (ctx) => {
		await rateLimiter(ctx.clients.redis, ctx.ip);

		return ctx;
	})
	.post("/", {
		body: z.object({
			content: z.string().max(2000).optional().nullable(),
			name: z.string().max(128).optional().nullable(),
			attachment: z.url().max(200).optional().nullable(),
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
