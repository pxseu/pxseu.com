export interface Song {
	title: string;
	artists: string;
	url: string;
}

export interface Album {
	name: string;
	image?: string;
	color?: string;
	url: string;
}

export interface Progress {
	start: string;
	end: string;
}

export interface Playing {
	id: string;
	song: Song;
	album: Album;
	progress: Progress;
}

export interface Location {
	city: string;
	country: string;
	timestamp: string;
}

export interface RealtimeData {
	playing: Playing;
	location: Location;
}

export interface RealtimeContextType {
	data: RealtimeData | null;
	isConnected: boolean;
}
