import { Request, Response } from "express";
import { GraphQLResponse } from "@pxseu-dot-com/web";
import { fetchGraphQL, gql } from "../../../utils/graphQL";
import { redis } from "../../../db/redis";
import { ANILIST_ENDPOINT, ANILIST_ID } from "../../../config";

const CACHE_KEY = "anilist:genres";
const CACHE_TIME = 20 * 60 * 1000;

export const genres = async (_: Request, res: Response): Promise<unknown> => {
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
						genres(limit: 5) {
							count
							genre
						}
					}
				}
			}
		}
	`;

	const response = await fetchGraphQL<GraphQLResponse>(ANILIST_ENDPOINT, query, {
		id: ANILIST_ID,
	});

	const data = response.data.User.statistics.anime.genres;

	await redis.psetex(CACHE_KEY, CACHE_TIME, JSON.stringify(data));

	res.set("Cache-Control", `max-age=${Math.ceil(CACHE_TIME / 1000)}`);

	res.api(200, {
		data,
		cached: false,
	});
};
