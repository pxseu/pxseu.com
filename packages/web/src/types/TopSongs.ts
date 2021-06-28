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
