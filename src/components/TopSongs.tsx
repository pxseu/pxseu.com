import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import styles from "../styles/components/TopSongs.module.css";

interface Song {
	song: {
		name: string;
		artists: string;
		url: string;
	};
	album: {
		name: string;
		image: string;
		url: string;
	};
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
				console.log(track.album);
				return (
					<div className={styles.song} key={key}>
						<div className={styles.songImage}>
							<img src={track.album.image} className={styles.songImgTag} />
						</div>
						<div className={styles.songContent}>
							<div className={styles.songTitle}>
								<a href={track.song.url} title={track.song.name}>
									{track.song.name}
								</a>
							</div>
							<div className={styles.artists}>
								by <span title={track.song.artists}>{track.song.artists}</span>
							</div>
							<div className={styles.album}>
								on{" "}
								<a href={track.album.url} title={track.album.name}>
									{track.album.name}
								</a>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TopSongs;
