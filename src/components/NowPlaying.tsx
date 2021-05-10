import React from "react";
import Head from "next/head";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import styles from "../styles/components/NowPlaying.module.css";

const API_PATH = "/api/v2/spotify/nowPlaying";

interface NowPlayingApi {
	playing: boolean;
	data: {
		song: {
			title: string;
			artists?: string;
			url?: string;
		};
		album: {
			name?: string;
			image?: string;
			url?: string;
		};
	};
}

const NowPlaying = (): JSX.Element => {
	const { data, error } = useSWR(API_PATH, fetcher, { refreshInterval: 100 });

	if (!data || error) {
		return (
			<>
				<Head>
					<link rel="preload" href={API_PATH} as="fetch" crossOrigin="anonymous" />
				</Head>

				<SkeletonTheme color="#222" highlightColor="#444">
					<div className={styles.spotifyBox}>
						<div className={styles.spotifyThumbnail}>
							<Skeleton height={100} className={styles.imagetag} />
						</div>
						<div className={styles.spotifyContent}>
							<p className={styles.songTitle}>
								<Skeleton />
							</p>
							<p className={styles.artists}>
								<Skeleton />
							</p>
							<p className={styles.album}>
								<Skeleton />
							</p>
						</div>
					</div>
				</SkeletonTheme>
			</>
		);
	}

	const placeholder = "/assets/placeholders/album.png";

	if (!data.playing) {
		return (
			<SkeletonTheme color="#222" highlightColor="#444">
				<div className={styles.spotifyBox}>
					<div className={styles.spotifyThumbnail}>
						<img width={100} height={100} className={styles.imagetag} src={placeholder} />
					</div>
					<div className={styles.spotifyContent}>
						<p className={styles.songTitle}>No song playing</p>
						<p className={styles.artists}>If you get lucky you,</p>
						<p className={styles.album}>can see me listen to music.</p>
					</div>
				</div>
			</SkeletonTheme>
		);
	}

	const spotify = (data as unknown) as NowPlayingApi;

	const image = !spotify.data.album.image ? placeholder : spotify.data.album.image;
	const artist = !spotify.data.song.artists ? "Unknown artist" : spotify.data.song.artists;
	const album = !spotify.data.album.name ? "No album" : spotify.data.album.name;

	return (
		<div className={styles.spotifyBox}>
			<div className={styles.spotifyThumbnail}>
				<img width={100} height={100} className={styles.imagetag} src={image} />
			</div>
			<div className={styles.spotifyContent}>
				<p className={styles.songTitle} title={spotify.data.song.title}>
					{spotify.data.song.url ? (
						<a href={spotify.data.song.url} target="_blank" rel="noreferrer">
							{spotify.data.song.title}
						</a>
					) : (
						spotify.data.song.title
					)}
				</p>
				<p className={styles.artists} title={`by ${artist}`}>
					by {artist}
				</p>
				<p className={styles.album} title={`on ${album}`}>
					on{" "}
					{spotify.data.song.url ? (
						<a href={spotify.data.album.url} target="_blank" rel="noreferrer">
							{spotify.data.album.name}
						</a>
					) : (
						album
					)}
				</p>
			</div>
		</div>
	);
};

export default NowPlaying;
