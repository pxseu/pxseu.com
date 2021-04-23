import { Request, Response } from "express";
import { fetchGraphQL, gql } from ".";
import { redis } from "../../../db/redis";

const CACHE_KEY = "anilist:genres";
const CACHE_TIME = 60 * 1000;

interface Genre {
	count: number;
	genre: string;
}

interface GraphQLResponse {
	data: {
		User: {
			statistics: {
				anime: {
					genres: Genre[];
				};
			};
		};
	};
}

export const genres = async (_: Request, res: Response): Promise<unknown> => {
	const cached = await redis.getAsync(CACHE_KEY);

	if (cached) {
		const data = JSON.parse(cached);

		return res.api(200, {
			data,
			cached: true,
		});
	}

	const query = gql`
		query($id: Int) {
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

	const response = await fetchGraphQL<GraphQLResponse>(query, { id: parseInt(process.env.ANILIST_ID ?? "") });

	const data = response.data.User.statistics.anime.genres;

	await redis.setAsync(CACHE_KEY, CACHE_TIME, JSON.stringify(data));

	res.api(200, {
		data,
		cached: false,
	});
};
