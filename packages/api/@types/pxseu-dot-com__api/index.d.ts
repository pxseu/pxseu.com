declare module "@pxseu-dot-com/web" {
	export interface EmbedFooter {
		text?: string;
		icon_url?: string;
	}

	export interface EmbedImage {
		url?: string;
	}

	export interface EmbedAuthor {
		name?: string;
		url?: string;
		icon_url?: string;
	}

	export interface GithubApiPinned {
		data: {
			viewer: GithubViewer;
		};
	}

	interface GithubViewer {
		pinnedItems: GithubPinnedItems;
	}

	interface GithubPinnedItems {
		totalCount: number;
		nodes: GithubNode[];
	}

	interface GithubPrimaryLanguage {
		color: string;
		name: string;
	}

	interface GithubDefaultBranchRef {
		target: {
			history: {
				totalCount: number;
			};
		};
	}

	interface GithubNode {
		owner: GithubOwner;
		name: string;
		stargazers: GithubStargazers;
		url: string;
		issues: GithubIssues;
		pullRequests: GithubPullRequests;
		description: string;
		primaryLanguage: GithubPrimaryLanguage;
		defaultBranchRef: GithubDefaultBranchRef;
		forks: GithubForks;
	}

	interface GithubOwner {
		login: string;
	}

	interface GithubStargazers {
		totalCount: number;
	}

	interface GithubIssues {
		totalCount: number;
	}

	interface GithubPullRequests {
		totalCount: number;
	}

	interface GithubForks {
		totalCount: number;
	}

	export interface GraphQLResponse {
		data: {
			User: User;
		};
	}

	interface AnimeEdge {
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

	interface Genre {
		count: number;
		genre: string;
	}
	interface User {
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

	export interface NowPlaying {
		is_playing: boolean;
		item: Song;
	}

	export interface TopSongs {
		items: Song[];
	}

	interface Song {
		name: string;
		artists: {
			name: string;
		}[];
		album: {
			name: string;
			external_urls: {
				spotify: string;
			};

			images: {
				url: string;
			}[];
		};
		external_urls: {
			spotify: string;
		};
	}
}
