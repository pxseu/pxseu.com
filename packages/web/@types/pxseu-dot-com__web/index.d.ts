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
		url: string;
	}

	export interface Project {
		image: string;
		name: string;
		description;
		href: string;
	}
}
