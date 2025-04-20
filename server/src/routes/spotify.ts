import { KaitoError } from "@kaito-http/core";
import { router } from "../context.js";
import z from "zod";

export const routes = router()
	.get("/get-auth-url", async ({ ctx }) => {
		const { spotify } = ctx;

		if (!spotify) {
			throw new KaitoError(500, "Spotify client not initialized");
		}

		const url = spotify.getAuthorizationUrl();

		return {
			url,
		};
	})
	.get("/callback", {
		query: {
			code: z.string(),
		},

		async run({ ctx, query }) {
			const { code } = query;
			const { spotify } = ctx;

			if (!spotify) {
				throw new KaitoError(500, "Spotify client not initialized");
			}

			try {
				const token = await spotify.getAccessToken(code);

				return {
					token,
				};
			} catch (error) {
				throw new KaitoError(500, "Failed to get access token, token may be expired or invalid");
			}
		},
	});
