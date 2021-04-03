export const fetcher = async (input: RequestInfo, init?: RequestInit): Promise<Record<string, unknown>> => {
	const res = await fetch(input, init);
	return res.json();
};
