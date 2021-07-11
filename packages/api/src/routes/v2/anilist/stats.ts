import { Request, Response } from "express";
import { GraphQLResponse } from "@pxseu-dot-com/web";
import { fetchGraphQL, gql } from "../../../utils/graphQL";
import { redis } from "../../../db/redis";
import { ANILIST_ENDPOINT, ANILIST_ID } from "../../../config";

const CACHE_KEY = "anilist:stats";
const CACHE_TIME = 20 * 60 * 1000;

export const stats = async (_: Request, res: Response): Promise<unknown> => {
	try {
		const cached = await redis.get(CACHE_KEY);

		if (cached) {
			const ttl = await redis.pttl(CACHE_KEY);

			res.set("Cache-Control", `max-age=${Math.ceil(ttl / 1000)}`);

			return res.api(200, {
				data: JSON.parse(cached),
				cached: true,
			});
		}

		const query = gql`
			query ($id: Int) {
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

		const response = await fetchGraphQL<GraphQLResponse>(ANILIST_ENDPOINT, query, {
			id: ANILIST_ID,
		});

		const data = {
			animeCount: response.data.User.statistics.anime.count,
			episodesWatched: response.data.User.statistics.anime.episodesWatched,
		};

		await redis.psetex(CACHE_KEY, CACHE_TIME, JSON.stringify(data));

		res.set("Cache-Control", `max-age=${Math.ceil(CACHE_TIME / 1000)}`);

		res.api(200, {
			data,
			cached: false,
		});
	} catch (e) {
		console.error(e);
	}
};
