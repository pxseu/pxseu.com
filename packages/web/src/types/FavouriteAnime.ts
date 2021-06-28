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
	color?: string;
	genres: string[];
	releaseYear: number;
}
