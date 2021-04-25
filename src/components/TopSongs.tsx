import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import styles from "../styles/components/TopSongs.module.css";

interface Song {
	song: {
		name: string;
		artists?: string;
		url?: string;
	};
	album: {
		name?: string;
		image?: string;
		url?: string;
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
								<div className={styles.songImage}>
									<Skeleton width={100} height={100} />
								</div>
								<div className={styles.songContent}>
									<div className={styles.songTitle}>
										<Skeleton />
									</div>
									<div className={styles.artists}>
										<Skeleton />
									</div>
									<div className={styles.album}>
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

	const placeholder = "/assets/placeholders/album.png";

	return (
		<div className={styles.topSongsWrapper}>
			{tracks.map((track, key) => {
				const image = !track.album.image ? placeholder : track.album.image;
				const artist = !track.song.artists ? "Unknown artist" : track.song.artists;
				const album = !track.album.name ? "No album" : track.album.name;

				return (
					<div className={styles.song} key={key}>
						<div className={styles.songImage}>
							<img src={image} className={styles.songImgTag} />
						</div>
						<div className={styles.songContent}>
							<div className={styles.songTitle}>
								{track.song.url ? (
									<a href={track.song.url} title={track.song.name}>
										{track.song.name}
									</a>
								) : (
									<span title={track.song.name}>{track.song.name}</span>
								)}
							</div>
							<div className={styles.artists}>
								by <span title={artist}>{artist}</span>
							</div>
							<div className={styles.album}>
								on{" "}
								{track.album.url ? (
									<a href={track.album.url} title={album}>
										{album}
									</a>
								) : (
									<span title={album}>{album}</span>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TopSongs;
