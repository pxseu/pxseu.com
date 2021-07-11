import fetch from "node-fetch";

export const gql = String.raw;

export const fetchGraphQL = async <T extends unknown>(
	url: string,
	query: string,
	variables: Record<string, unknown>,
	headers: Record<string, unknown> = {},
): Promise<T> => {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...headers,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	};

	const res = await fetch(url, options);

	if (!res.ok) throw new Error("Failed to make the Api Call");

	return res.json();
};
