export interface AnimeEdge {
	favouriteOrder: number;
	node: {
		siteUrl: string;
		title: {
			english: string;
		};
		coverImage: {
			extraLarge: string;
			color: string;
		};
		genres: string[];
		startDate: {
			year: number;
		};
		bannerImage: string;
		description: string;
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
