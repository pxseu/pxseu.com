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
			timestamp: z.coerce.date(),
		}),
		run({ ctx, body }) {
			const { location } = ctx.realtime;
			const auth = ctx.req.headers.get("Authorization");

			if (!auth) {
				throw new KaitoError(401, "Unauthorized");
			}

			if (auth.length !== config.LOCATION_SECRET.length) {
				throw new KaitoError(401, "Unauthorized");
			}

			if (
				!crypto.timingSafeEqual(
					Buffer.from(auth),
					Buffer.from(config.LOCATION_SECRET),
				)
			) {
				throw new KaitoError(401, "Unauthorized");
			}

			location.update(body);

			return {
				message: "Location updated",
			};
		},
	});
