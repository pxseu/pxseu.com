import { Flex, Text, Link, Tooltip, useToast } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import useSWR from "swr";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Head from "next/head";
import { fetcher } from "../../config/fetcher";
import { API_ROUTE } from "../../config/globals";
import { NowPlaying as INowPlaying } from "../../types/NowPlaying";

interface Props {
	image: ReactNode;
	title: ReactNode;
	artists?: ReactNode;
	album?: ReactNode;
}

const API_PATH = `${API_ROUTE}/v2/spotify/nowPlaying`;

const NowPlayingCard: FC<Props> = ({ image, title, artists, album }) => (
	<Flex
		display="inline-flex"
		backgroundColor="blackAlpha.500"
		p={2.5}
		borderRadius={10}
		boxShadow="xl"
		alignItems="center"
	>
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
		<Flex
			flexDirection="column"
			justifyContent="space-between"
			py={4}
			px={{ base: "4", md: "6" }}
			overflow="hidden"
			maxWidth={{ base: "200", md: "300", xl: "500" }}
		>
			<Text fontSize="2xl" isTruncated>
				{title}
			</Text>
			<Text isTruncated>{artists}</Text>
			<Text isTruncated>{album}</Text>
		</Flex>
	</Flex>
);

const NowPlaying: FC = () => {
	const { data, error } = useSWR<INowPlaying>(API_PATH, fetcher, { refreshInterval: 100 });
	const toast = useToast();

	if (error) {
		toast({
			title: "Failed to fetch now playing song.",
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
			/>
		);

	return (
		<NowPlayingCard
			image={<Image src={coverImage} width={200} height={200} quality={75} alt="Album cover" />}
			title={
				Spotify.song.url ? (
					<Link
						as="a"
						href={Spotify.song.url}
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
						<Tooltip label={Spotify.song.title} aria-label="A tooltip">
							<b>{Spotify.song.title}</b>
						</Tooltip>
					</Link>
				) : (
					<Tooltip label={Spotify.song.title} aria-label="A tooltip">
						<b>{Spotify.song.title}</b>
					</Tooltip>
				)
			}
			artists={
				<>
					by{" "}
					<Tooltip label={Spotify.song.artists ?? "Unknown artist"} aria-label="A tooltip">
						<b>{Spotify.song.artists ?? "Unknown artist"}</b>
					</Tooltip>
				</>
			}
			album={
				Spotify.album.name && (
					<>
						on{" "}
						{Spotify.album.url ? (
							<Link
								as="a"
								href={Spotify.album.url}
								variant="link"
								target="_blank"
								textDecoration="underline"
								textDecorationColor="brand.100"
								textDecorationThickness="2px"
								_hover={{
									textDecorationColor: "brand.900",
								}}
							>
								<Tooltip label={Spotify.album.name} aria-label="A tooltip">
									<b>{Spotify.album.name}</b>
								</Tooltip>
							</Link>
						) : (
							<Tooltip label={Spotify.album.name} aria-label="A tooltip">
								<b>{Spotify.album.name}</b>
							</Tooltip>
						)}
					</>
				)
			}
		/>
	);
};

export default NowPlaying;

/*

<Flex
			display="inline-flex"
			backgroundColor="gray.700"
			p={4}
			borderRadius={8}
			boxShadow="xl"
			alignItems="center"
		>
			<Flex
				borderRadius={8}
				overflow="hidden"
				justifyContent="center"
				alignItems="center"
				boxShadow="md"
				width={120}
				height={120}
			>
				<Image src={coverImage} width={200} height={200} quality={75} alt="Album cover" />
			</Flex>
			<Flex
				flexDirection="column"
				justifyContent="space-between"
				py={4}
				px={{ base: "4", md: "6" }}
				overflow="hidden"
				maxW={{ base: "200", md: "300", xl: "500" }}
			>
				<Text fontSize="2xl" title={Spotify.song.title} isTruncated>
					{Spotify.song.url ? (
						<Link as="a" href={Spotify.song.url} variant="link" target="_blank">
							<b>{Spotify.song.title}</b>
						</Link>
					) : (
						<b>{Spotify.song.title}</b>
					)}
				</Text>

				<Text title={Spotify.song.artists} isTruncated>
					by <b>{Spotify.song.artists ?? "Unknown artist"}</b>
				</Text>

				{Spotify.album.name && (
					<Text title={Spotify.album.name} isTruncated>
						on{" "}
						{Spotify.album.url ? (
							<Link as="a" href={Spotify.album.url} variant="link" target="_blank">
								<b>{Spotify.album.name}</b>
							</Link>
						) : (
							<b>{Spotify.album.name}</b>
						)}
					</Text>
				)}
			</Flex>
		</Flex>

		*/
