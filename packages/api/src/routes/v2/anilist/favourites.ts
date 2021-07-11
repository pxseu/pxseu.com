import { Request, Response } from "express";
import { GraphQLResponse } from "@pxseu-dot-com/web";
import { fetchGraphQL, gql } from "../../../utils/graphQL";
import { redis } from "../../../db/redis";
import { ANILIST_ENDPOINT, ANILIST_ID } from "../../../config";
import { colorToBaseImage } from "../../../utils/colorToBaseImage";

const CACHE_KEY = "anilist:favourites";
const CACHE_TIME = 20 * 60 * 1000;

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
								id
								siteUrl
								title {
									english
								}
								coverImage {
									extraLarge
									color
								}
								genres
								startDate {
									year
								}
								bannerImage
								description(asHtml: false)
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

	const data = await Promise.all(
		response.data.User.favourites.anime.edges
			.sort((a, b) => a.favouriteOrder - b.favouriteOrder)
			.slice(0, 6)
			.map(async (edge) => ({
				order: edge.favouriteOrder,
				title: edge.node.title.english,
				siteUrl: edge.node.siteUrl,
				image: edge.node.coverImage.extraLarge,
				blurImage: await colorToBaseImage(edge.node.coverImage.color),
				color: edge.node.coverImage.color,
				genres: edge.node.genres,
				releaseYear: edge.node.startDate.year,
				banner: edge.node.bannerImage,
				description: edge.node.description,
			})),
	);

	await redis.psetex(CACHE_KEY, CACHE_TIME, JSON.stringify(data));

	res.set("Cache-Control", `max-age=${Math.ceil(CACHE_TIME / 1000)}`);

	res.api(200, {
		data,
		cached: false,
	});
};
