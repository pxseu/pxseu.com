export interface AnimeEdge {
	favouriteOrder: number;
	node: {
		siteUrl: string;
		title: {
			english: string;
		};
		coverImage: {
			medium: string;
			color: string;
		};
		genres: string[];
		startDate: {
			year: number;
		};
	};
}

export interface Genre {
	count: number;
	genre: string;
}

export interface User {
	favourites: {
		anime: {
			edges: AnimeEdge[];
		};
	};

	statistics: {
		anime: {
			count: number;
			episodesWatched: number;
			genres: Genre[];
		};
	};
}

export interface GraphQLResponse {
	data: {
		User: User;
	};
}
