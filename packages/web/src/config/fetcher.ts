export const fetcher = async <T extends any>(input: RequestInfo, init?: RequestInit): Promise<T> => {
	const res = await fetch(input, init);
	return res.json();
};
