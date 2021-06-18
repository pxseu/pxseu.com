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

export interface NowPlaying {
	is_playing: boolean;
	item: Song;
}

export interface TopSongs {
	items: Song[];
}
