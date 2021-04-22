import { Router } from "express";
import fetch from "node-fetch";
import { stats } from "./stats";
import { genres } from "./genres";
import { favourites } from "./favourites";

export const gql = String.raw;

export const fetchGraphQL = async <T extends unknown>(
	query: string,
	variables: Record<string, unknown>
): Promise<T> => {
	const url = "https://graphql.anilist.co",
		options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query: query,
				variables: variables,
			}),
		};

	const res = await fetch(url, options);

	if (res.status < 200 && res.status >= 300) throw new Error("Failed to make the Api Call");

	return res.json();
};

export const router = Router();

router.use("/stats", stats);
router.use(["/topGenres", "/top_genres"], genres);
router.use("/favourites", favourites);
