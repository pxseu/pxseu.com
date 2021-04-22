import React, { FC } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import styles from "../styles/components/FavouriteAnime.module.css";

interface Anime {
	order: number;
	title: string;
	siteUrl: string;
	image: string;
	genres: string[];
	releaseYear: number;
}

// eslint-disable-next-line react/prop-types
const AnimeGenra: FC = ({ children }) => <div className={styles.genra}>{children}</div>;

const FavouriteAnime = (): JSX.Element => {
	const { data, error } = useSWR("/api/v2/anilist/favourites", fetcher);

	if (!data || error) {
		return (
			<SkeletonTheme color="#222" highlightColor="#444">
				<div className={styles.favouriteAnime}>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, key) => {
						return (
							<div className={styles.anime} key={key}>
								<div className={styles.animeImage}>
									<Skeleton height={150} />
								</div>
								<div className={styles.animeText}>
									<div className={styles.animeTitle}>
										<Skeleton />
									</div>
									<div className={styles.animeGenres}>
										{[0, 1].map((_, key) => (
											<Skeleton
												width={70}
												key={key}
												style={{
													padding: "5px",
													margin: "2px",
													borderRadius: "var(--border-radius)",
												}}
											/>
										))}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</SkeletonTheme>
		);
	}

	const AnimeList = data.data as Anime[];

	return (
		<div className={styles.favouriteAnime}>
			{AnimeList.map((Anime, key) => {
				return (
					<div className={styles.anime} key={key}>
						<div className={styles.animeImage}>
							<img src={Anime.image} className={styles.imagetag} alt="" />
						</div>
						<div className={styles.animeText}>
							<div className={styles.animeTitle}>
								<p>
									<a
										className={styles.animeTitleLink}
										href={Anime.siteUrl}
										title={`${Anime.title} (${Anime.releaseYear})`}>
										{Anime.title} ({Anime.releaseYear})
									</a>
								</p>
							</div>
							<div className={styles.animeGenres}>
								{Anime.genres.slice(0, 2).map((genra, key) => (
									<AnimeGenra key={key}>{genra}</AnimeGenra>
								))}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default FavouriteAnime;
