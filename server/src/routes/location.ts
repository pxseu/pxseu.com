import { timingSafeEqual } from "node:crypto";
import { KaitoError, k } from "@kaito-http/core";
import { config } from "../config.js";
import { kaito } from "../context.js";

export const routes = kaito
	.get("/", ({ ctx }) => ctx.realtime.location.state)
	.post("/update", {
		body: k.object({
			city: k.string(),
			country: k.string(),
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
