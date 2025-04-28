import { sleep } from "../utils/sleep.js";

export const fetch = async (url: string, options?: RequestInit): Promise<Response> => {
	console.log("Fetching", url, new Date());

	try {
		const response = await globalThis.fetch(url, {
			...options,
			headers: {
				...options?.headers,
				"User-Agent": `pxseu/2.0 (+https://pxseu.com) Node/${process.version}`,
			},
		});

		if (!response.ok) {
			if (response.status >= 500) {
				await sleep(1500);
				return fetch(url, options);
			}

			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response;
	} catch (error) {
		console.error("Fetch error", error);
		await sleep(1500);
		return fetch(url, options);
	}
};
