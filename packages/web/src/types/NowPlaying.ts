export interface NowPlaying {
	playing: boolean;
	data: Data;
	cached: boolean;
	success: boolean;
}

export interface Data {
	song: Song;
	album: Album;
}

export interface Song {
	title: string;
	artists?: string;
	url: string;
}

export interface Album {
	name?: string;
	image: string;
	url: string;
}
