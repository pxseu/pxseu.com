import { Flex, Text, Link, Tooltip, useToast } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import useSWR from "swr";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Head from "next/head";
import { fetcher } from "../../config/fetcher";
import { API_ROUTE } from "../../config/globals";
import { NowPlaying as INowPlaying } from "../../types/NowPlaying";

interface CardProps {
	image: ReactNode;
	title: ReactNode;
	artists?: ReactNode;
	album?: ReactNode;
	imageTooltip?: string;
	isNoData?: boolean;
}

const API_PATH = `${API_ROUTE}/v2/spotify/nowPlaying`;

const NowPlayingCard: FC<CardProps> = ({ image, title, artists, album, imageTooltip, isNoData }) => (
	<Flex
		display="inline-flex"
		backgroundColor="blackAlpha.500"
		p={2.5}
		borderRadius={10}
		boxShadow="xl"
		alignItems="center"
	>
		<Tooltip label={imageTooltip} aria-label="A tooltip" hasArrow placement="top">
			<Flex
				borderRadius={8}
				overflow="hidden"
				justifyContent="center"
				alignItems="center"
				boxShadow="md"
				width={100}
				height={100}
			>
				{image}
			</Flex>
		</Tooltip>
		<Flex
			flexDirection="column"
			justifyContent="space-between"
			py={2}
			px={{ base: "2", md: "4" }}
			overflow="hidden"
			maxWidth={{ base: "200", md: "300", xl: "500" }}
		>
			<Text fontSize={isNoData ? "xl" : "2xl"} isTruncated={!isNoData}>
				{title}
			</Text>
			{artists && <Text isTruncated>{artists}</Text>}
			{album && <Text isTruncated>{album}</Text>}
		</Flex>
	</Flex>
);

interface LinkifyProps {
	link?: string;
}

const Linkify: FC<LinkifyProps> = ({ children, link }) => {
	if (!link) return <> {children}</>;

	return (
		<Link
			as="a"
			href={link}
			variant="link"
			target="_blank"
			transitionProperty="text-decoration-color"
			transitionDuration="200ms"
			textDecoration="underline"
			textDecorationColor="brand.100"
			textDecorationThickness="2px"
			_hover={{
				textDecorationColor: "brand.900",
			}}
		>
			{children}
		</Link>
	);
};

const NowPlaying: FC = () => {
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

	if (!data || error) {
		return (
			<>
				<Head>
					<link rel="preload" href={API_PATH} as="fetch" crossOrigin="anonymous" />
				</Head>

				<SkeletonTheme color="#111" highlightColor="#222">
					<NowPlayingCard
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
			<NowPlayingCard
				image={<Image src={coverImage} width={200} height={200} quality={75} alt="Album cover" />}
				title="No song playing"
				isNoData
			/>
		);

	const songTitle = Spotify.song.title;
	const songArtists = Spotify.song.artists;
	const albumName = Spotify.album.name;

	return (
		<NowPlayingCard
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
