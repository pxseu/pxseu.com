class HttpError extends Error {
	constructor(
		public status: number,
		public message: string,
	) {
		super(message);
	}
}

const MAX_RETRIES = 5;

export const fetch = async (
	url: string,
	options?: RequestInit,
	_retries = 0,
): Promise<Response> => {
	const response = await globalThis.fetch(url, {
		...options,
		headers: {
			...options?.headers,
			"User-Agent": `pxseu/2.0 (+https://api.pxseu.com) Bun/${Bun.version}`,
		},
	});

	if (!response.ok) {
		if (response.status >= 500 && _retries < MAX_RETRIES) {
			await Bun.sleep(1500);
			return fetch(url, options, _retries + 1);
		}

		if (response.status === 429 && _retries < MAX_RETRIES) {
			const retryAfter = response.headers.get("Retry-After");
			await Bun.sleep(retryAfter ? parseInt(retryAfter, 10) * 1000 : 1500);
			return fetch(url, options, _retries + 1);
		}

		throw new HttpError(response.status, response.statusText);
	}

	return response;
};
