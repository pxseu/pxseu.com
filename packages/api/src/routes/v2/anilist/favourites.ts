import { Request, Response } from "express";
import { fetchGraphQL, gql } from "../../../utils/graphQL";
import { redis } from "../../../db/redis";
import { ANILIST_ENDPOINT, ANILIST_ID } from "../../../config";
import { GraphQLResponse } from "./types";

const CACHE_KEY = "anilist:favourites";
const CACHE_TIME = 60 * 1000;

export const favourites = async (_: Request, res: Response): Promise<unknown> => {
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
				favourites {
					anime {
						edges {
							favouriteOrder
							node {
								siteUrl
								title {
									english
								}
								coverImage {
									medium
									color
								}
								genres
								startDate {
									year
								}
								# studios {
								# 	nodes {
								# 		name
								# 		isAnimationStudio
								# 	}
								# }
							}
						}
					}
				}
			}
		}
	`;

	let response: GraphQLResponse;

	try {
		response = await fetchGraphQL<GraphQLResponse>(ANILIST_ENDPOINT, query, {
			id: ANILIST_ID,
		});
	} catch (error) {
		return res.api(500, {
			data: "Failed to make the call with an external Api",
			cached: false,
		});
	}

	const data = response.data.User.favourites.anime.edges
		.sort((a, b) => a.favouriteOrder - b.favouriteOrder)
		.slice(0, 12)
		.map((edge) => ({
			order: edge.favouriteOrder,
			title: edge.node.title.english,
			siteUrl: edge.node.siteUrl,
			image: edge.node.coverImage.medium,
			color: edge.node.coverImage.color,
			genres: edge.node.genres,
			releaseYear: edge.node.startDate.year,
		}));

	await redis.psetex(CACHE_KEY, CACHE_TIME, JSON.stringify(data));

	res.set("Cache-Control", `max-age=${Math.ceil(CACHE_TIME / 1000)}`);

	res.api(200, {
		data,
		cached: false,
	});
};
