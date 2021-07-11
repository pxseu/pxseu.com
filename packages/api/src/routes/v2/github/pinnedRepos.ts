import { GithubApiPinned } from "@pxseu-dot-com/web";
import { Response } from "express";
import { GITHUB_AUTHORIZATION, GITHUB_ENDPOINT } from "../../../config";
import { redis } from "../../../db/redis";
import { fetchGraphQL, gql } from "../../../utils/graphQL";

const CACHE_KEY = "github:pinned_repos";
const CACHE_TIME = 20 * 60 * 1000;

export const pinnedRepos = async (_: unknown, res: Response) => {
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
		query ($count: Int) {
			viewer {
				pinnedItems(first: $count) {
					totalCount
					nodes {
						... on Repository {
							owner {
								login
							}
							name
							stargazers {
								totalCount
							}
							url
							issues {
								totalCount
							}
							pullRequests {
								totalCount
							}
							forks {
								totalCount
							}
							description
							primaryLanguage {
								color
								name
							}
							defaultBranchRef {
								target {
									... on Commit {
										history {
											totalCount
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`;

	let response: GithubApiPinned;

	try {
		response = await fetchGraphQL<GithubApiPinned>(
			GITHUB_ENDPOINT,
			query,
			{
				count: 10, // blah blah fetch all basically because i don't want to limit
			},
			{ Authorization: GITHUB_AUTHORIZATION },
		);
	} catch (error) {
		return res.api(500, {
			data: "Failed to make the call with an external Api",
			cached: false,
		});
	}

	const data = response.data.viewer.pinnedItems.nodes.map((props) => ({
		name: props.name,
		owner: props.owner.login,
		url: props.url,
		stargazers: props.stargazers.totalCount,
		issues: props.issues.totalCount,
		pullRequests: props.pullRequests.totalCount,
		description: props.description,
		commitCount: props.defaultBranchRef.target.history.totalCount,
		forks: props.forks.totalCount,
		language: props.primaryLanguage,
	}));

	console.log(response.data.viewer.pinnedItems.nodes[0].defaultBranchRef, data);

	await redis.psetex(CACHE_KEY, CACHE_TIME, JSON.stringify(data));

	res.set("Cache-Control", `max-age=${Math.ceil(CACHE_TIME / 1000)}`);

	res.api(200, {
		data,
		cached: false,
	});
};
