export const fetch = async (url: string, options?: RequestInit) => {
	const response = await globalThis.fetch(url, {
		...options,
		headers: {
			...options?.headers,
			"User-Agent": `pxseu/2.0 (+https://pxseu.com) Node/${process.version}`,
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response;
};
