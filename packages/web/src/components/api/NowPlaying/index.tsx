import { FlexProps, useToast } from "@chakra-ui/react";
import React, { FC } from "react";
import useSWR from "swr";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Head from "next/head";
import { fetcher } from "@/conf/fetcher";
import { API_ROUTE } from "@/conf/globals";
import { NowPlaying as INowPlaying } from "@pxseu-dot-com/web";
import SongCard from "@/comp/utils/SongCard";
import Linkify from "@/comp/utils/Linkify";

const API_PATH = `${API_ROUTE}/v2/spotify/nowPlaying`;

const NowPlaying: FC<FlexProps> = (props) => {
	const { data, error } = useSWR<INowPlaying>(API_PATH, fetcher, { refreshInterval: 100 });
	const toast = useToast();

	if (error) {
		toast({
			title: "Failed to fetch the song.",
			description: "Failed to fetch the currently playing song from the remote API",
			position: "bottom-left",
			duration: 1500,
			status: "error",
		});
	}

	if (!data) {
		return (
			<>
				<Head>
					<link rel="preload" href={API_PATH} as="fetch" crossOrigin="anonymous" />
				</Head>

				<SkeletonTheme color="#111" highlightColor="#222">
					<SongCard
						flexProps={props}
						image={<Skeleton width={120} height={120} />}
						title={<Skeleton width={180} />}
						artists={<Skeleton width={180} />}
						album={<Skeleton width={180} />}
					/>
				</SkeletonTheme>
			</>
		);
	}

	const { data: Spotify } = data;

	const coverImage = Spotify?.album.image ?? "/assets/placeholder/album.png";

	if (!data.playing)
		return (
			<SongCard
				flexProps={props}
				image={<Image src={coverImage} width={200} height={200} quality={75} alt="Album cover" />}
				title="No song playing"
				isNoData
			/>
		);

	const songTitle = Spotify.song.title;
	const songArtists = Spotify.song.artists;
	const albumName = Spotify.album.name;

	return (
		<SongCard
			flexProps={props}
			image={<Image src={coverImage} width={200} height={200} quality={75} alt="Album cover" />}
			imageTooltip={albumName}
			title={
				<Linkify link={Spotify.song.url}>
					<b title={songTitle}>{songTitle}</b>
				</Linkify>
			}
			artists={
				songArtists && (
					<>
						by <b title={songArtists}>{songArtists}</b>
					</>
				)
			}
			album={
				albumName && (
					<>
						on{" "}
						<Linkify link={Spotify.album.url}>
							<b title={albumName}>{albumName}</b>
						</Linkify>
					</>
				)
			}
		/>
	);
};

export default NowPlaying;
