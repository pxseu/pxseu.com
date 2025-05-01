import { sleep } from "../utils/sleep.js";

export class HttpError extends Error {
	constructor(public status: number, public message: string) {
		super(message);
	}
}

export const fetch = async (url: string, options?: RequestInit): Promise<Response> => {
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

			if (response.status === 429) {
				const retryAfter = response.headers.get("Retry-After");

				await sleep(retryAfter ? parseInt(retryAfter) * 1000 : 1500);
				return fetch(url, options);
			}

			throw new HttpError(response.status, response.statusText);
		}

		return response;
	} catch (error) {
		if (error instanceof HttpError) {
			throw error;
		}

		console.error("Fetch error", error);
		await sleep(1500);
		return fetch(url, options);
	}
};
