import { timingSafeEqual } from "node:crypto";
import { KaitoError } from "@kaito-http/core";
import { z } from "zod";
import { config } from "../config.js";
import { router } from "../context.js";

export const routes = router()
	.get("/", async ({ ctx }) => {
		const { location } = ctx.realtime;

		return location.state;
	})
	.post("/update", {
		body: z.object({
			city: z.string(),
			country: z.string(),
		}),
		run({ ctx, body }) {
			const { location } = ctx.realtime;
			let auth = ctx.req.headers.get("Authorization");

			if (!auth) {
				throw new KaitoError(401, "Unauthorized");
			}

			if (auth.length !== config.LOCATION_SECRET.length) {
				// replace last char with next char in alphabet
				auth = `${config.LOCATION_SECRET.slice(0, -1)}${String.fromCharCode(config.LOCATION_SECRET.charCodeAt(-1) + 1)}`;
			}

			if (
				!timingSafeEqual(Buffer.from(auth), Buffer.from(config.LOCATION_SECRET))
			) {
				throw new KaitoError(401, "Unauthorized");
			}

			location.update({
				...body,
				timestamp: new Date(),
			});

			return {
				message: "Location updated",
			};
		},
	});
