declare module "@pxseu-dot-com/web" {
	// FavouriteAnime

	export interface FavouriteAnime {
		data: Anime[];
		cached: boolean;
		success: boolean;
	}

	interface Anime {
		order: number;
		title: string;
		siteUrl: string;
		image: string;
		blurImage?: string;
		color: string;
		genres: string[];
		releaseYear: number;
		banner: string;
		description: string;
	}

	// TopSongs

	export interface TopSongs {
		tracks: Track[];
		cached: boolean;
		success: boolean;
	}

	interface Track {
		song: Song;
		album: Album;
	}

	interface Song {
		name: string;
		artists: string;
		url: string;
	}

	interface Album {
		name: string;
		image: string;
		url: string;
	}

	// Now playing

	export interface NowPlaying {
		playing: boolean;
		data: NowPlayingData;
		cached: boolean;
		success: boolean;
	}

	interface NowPlayingData {
		song: Song;
		album: Album;
	}

	interface Song {
		title: string;
		artists?: string;
		url: string;
	}

	interface Album {
		name?: string;
		image: string;
		color?: string;
		url: string;
	}

	export interface GithubResponse {
		data: Repository[];
		cached: boolean;
		success: boolean;
	}

	export interface Repository {
		name: string;
		owner: string;
		url: string;
		stargazers: number;
		issues: number;
		pullRequests: number;
		description: string;
		commitCount: number;
		forks: number;
		language: Language;
	}

	interface Language {
		color: string;
		name: string;
	}
}
