class HttpError extends Error {
	constructor(
		public status: number,
		public message: string,
	) {
		super(message);
	}
}

const MAX_RETRIES = 5;
const RETRYABLE_METHODS = new Set(["GET", "HEAD"]);

const getRetryDelay = (response: Response) => {
	const retryAfter = response.headers.get("Retry-After");
	if (!retryAfter) return 1500;

	const seconds = Number(retryAfter);
	if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);

	const date = Date.parse(retryAfter);
	return Number.isNaN(date) ? 1500 : Math.max(0, date - Date.now());
};

export const fetch = async (
	url: string,
	options?: RequestInit,
	_retries = 0,
): Promise<Response> => {
	const method = (options?.method ?? "GET").toUpperCase();
	const canRetry = RETRYABLE_METHODS.has(method) && _retries < MAX_RETRIES;
	const response = await globalThis.fetch(url, {
		...options,
		headers: {
			...options?.headers,
			"User-Agent": `pxseu/2.0 (+https://api.pxseu.com) Bun/${Bun.version}`,
		},
	});

	if (!response.ok) {
		if (response.status >= 500 && canRetry) {
			await Bun.sleep(1500);
			return fetch(url, options, _retries + 1);
		}

		if (response.status === 429 && canRetry) {
			await Bun.sleep(getRetryDelay(response));
			return fetch(url, options, _retries + 1);
		}

		throw new HttpError(response.status, response.statusText);
	}

	return response;
};

export function parseJson<T>(response: Response): Promise<T> {
	return response.json() as Promise<T>;
}
