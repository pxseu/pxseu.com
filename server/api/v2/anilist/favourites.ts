import { Request, Response } from "express";
import { fetchGraphQL, gql } from ".";
import { redis } from "../../../db/redis";

const CACHE_KEY = "anilist:favourites";
const CACHE_TIME = 60 * 1000;

interface AnimeEdge {
	favouriteOrder: number;
	node: {
		siteUrl: string;
		title: {
			english: string;
		};
		coverImage: {
			medium: string;
			color: string;
		};
		genres: string[];
		startDate: {
			year: number;
		};
	};
}

interface User {
	favourites: {
		anime: {
			edges: AnimeEdge[];
		};
	};
}

interface GraphQLResponse {
	data: {
		User: User;
	};
}

export const favourites = async (_: Request, res: Response): Promise<unknown> => {
	const cached = await redis.getAsync(CACHE_KEY);

	if (cached) {
		const data = JSON.parse(cached);

		return res.api(200, {
			data,
			cached: true,
		});
	}

	// anilist is broke so this wont work sgpojksdfgiojdfguiohfg0iojgrioj

	// return res.api(500, {
	// 	data: "Failed to make the call with an external Api",
	// 	cached: false,
	// });

	const query = gql`
		query($id: Int) {
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
		response = await fetchGraphQL<GraphQLResponse>(query, { id: parseInt(process.env.ANILIST_ID ?? "0") });
	} catch (error) {
		return res.api(500, {
			data: "Failed to make the call with an external Api",
			cached: false,
		});
	}

	const data = response.data.User.favourites.anime.edges
		.sort((a, b) => a.favouriteOrder - b.favouriteOrder)
		.slice(0, 10)
		.map((edge) => {
			return {
				order: edge.favouriteOrder,
				title: edge.node.title.english,
				siteUrl: edge.node.siteUrl,
				image: edge.node.coverImage.medium,
				color: edge.node.coverImage.color,
				genres: edge.node.genres,
				releaseYear: edge.node.startDate.year,
			};
		});

	await redis.setAsync(CACHE_KEY, CACHE_TIME, JSON.stringify(data));

	res.api(200, {
		data,
		cached: false,
	});
};
