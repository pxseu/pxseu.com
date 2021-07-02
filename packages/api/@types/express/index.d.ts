// placeholder
interface User {
	auth_key: string;
	rate_limit: Record<string, RateLimitData>;
	name: string;
}

interface RateLimitData {
	amount: number;
	reset: number;
}

declare namespace Express {
	interface Response {
		api: (status: number, body?: Record<string, any>) => this;
	}

	interface Request {
		user?: User;
	}
}
