import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import styles from "../styles/components/TopSongs.module.css";

interface Song {
	title: string;
	artist: string;
	songUrl: string;
}

const TopSongs = (): JSX.Element => {
	const { data, error } = useSWR("/api/v2/spotify/topSongs", fetcher);

	const emtpyArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	if (!data || error) {
		return (
			<SkeletonTheme color="#222" highlightColor="#444">
				<div className={styles.topSongsWrapper}>
					{emtpyArr.map((_, key) => {
						return (
							<div className={styles.song} key={key}>
								<div className={styles.number}>{key + 1}</div>
								<div className={styles.songContent}>
									<div className={styles.songTitle}>
										<Skeleton />
									</div>
									<div className={styles.songArtists}>
										<Skeleton />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</SkeletonTheme>
		);
	}

	const tracks = data.tracks as Song[];

	return (
		<div className={styles.topSongsWrapper}>
			{tracks.map((track, key) => {
				return (
					<div className={styles.song} key={key}>
						<div className={styles.number}>{key + 1}</div>
						<div className={styles.songContent}>
							<div className={styles.songTitle}>
								<a href={track.songUrl}>{track.title}</a>
							</div>
							<div className={styles.songArtists}>by {track.artist}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TopSongs;
