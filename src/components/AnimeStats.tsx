import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import styles from "../styles/components/AnimeStats.module.css";

interface Stats {
	animeCount: string;
	episodesWatched: string;
}

const AnimeStats = (): JSX.Element => {
	const { data, error } = useSWR("/api/v2/anilist/stats", fetcher);

	if (!data || error) {
		return (
			<div className={styles.animeStatsWrapper}>
				<SkeletonTheme color="#222" highlightColor="#444">
					<div className={styles.animeStats}>
						<div className={styles.statsText}>
							<Skeleton />
						</div>
						<div className={styles.statsText}>
							<Skeleton />
						</div>
					</div>
				</SkeletonTheme>
			</div>
		);
	}

	const response = data.data as Stats;

	return (
		<div className={styles.animeStatsWrapper}>
			<div className={styles.animeStats}>
				<div className={styles.statsText}>Total Anime watched: {response.animeCount}</div>
				<div className={styles.statsText}>Total Episodes watched: {response.episodesWatched}</div>
			</div>
		</div>
	);
};

export default AnimeStats;
