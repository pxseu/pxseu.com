import { Request, Response } from "express";
import { fetchGraphQL, gql } from ".";
import { redis } from "../../../db/redis";

const CACHE_KEY = "anilist:stats";
const CACHE_TIME = 60 * 1000;

interface User {
	statistics: {
		anime: {
			count: number;
			episodesWatched: number;
		};
	};
}

interface GraphQLResponse {
	data: {
		User: User;
	};
}

export const stats = async (_: Request, res: Response): Promise<unknown> => {
	const cached = await redis.getAsync(CACHE_KEY);

	if (cached) {
		const ttl = await redis.ttlAsync(CACHE_KEY);

		res.set("Cache-Control", `max-age=${Math.ceil(ttl / 1000)}`);

		return res.api(200, {
			data: JSON.parse(cached),
			cached: true,
		});
	}

	const query = gql`
		query($id: Int) {
			User(id: $id) {
				statistics {
					anime {
						count
						episodesWatched
					}
				}
			}
		}
	`;

	const response = await fetchGraphQL<GraphQLResponse>(query, { id: parseInt(process.env.ANILIST_ID ?? "0") });

	const data = {
		animeCount: response.data.User.statistics.anime.count,
		episodesWatched: response.data.User.statistics.anime.episodesWatched,
	};

	await redis.setAsync(CACHE_KEY, CACHE_TIME, JSON.stringify(data));

	res.set("Cache-Control", `max-age=${Math.ceil(CACHE_TIME / 1000)}`);

	res.api(200, {
		data,
		cached: false,
	});
};
