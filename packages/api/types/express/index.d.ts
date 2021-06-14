declare namespace Express {
	interface Response {
		api: (status: number, body: Record<string, any>) => this;
	}
}
