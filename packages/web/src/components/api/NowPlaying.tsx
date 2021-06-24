import { Flex, Text, Link } from "@chakra-ui/react";
import React, { FC } from "react";
import useSWR from "swr";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { fetcher } from "../../config/fetcher";
import { API_ROUTE } from "../../config/globals";
import { NowPlaying as INowPlaying } from "../../types/NowPlaying";

// import Head from "next/head";

const API_PATH = `${API_ROUTE}/v2/spotify/nowPlaying`;

const NowPlaying: FC = () => {
	const { data, error } = useSWR<INowPlaying>(API_PATH, fetcher, { refreshInterval: 100 });

	if (!data || error)
		return (
			<SkeletonTheme color="#222" highlightColor="#333">
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
						<Skeleton width={120} height={120} />
					</Flex>
					<Flex
						flexDirection="column"
						justifyContent="space-between"
						py={4}
						px={{ base: "4", md: "6" }}
						overflow="hidden"
						maxW={{ base: "200", md: "300", xl: "500" }}
					>
						<Text fontSize="2xl">
							<Skeleton width={180} />
						</Text>

						<Text>
							<Skeleton />
						</Text>

						<Text>
							<Skeleton />
						</Text>
					</Flex>
				</Flex>
			</SkeletonTheme>
		);

	const { data: Spotify } = data;

	const coverImage = Spotify.album.image ?? "/assets/placeholder/album.png";

	return (
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
	);
};

export default NowPlaying;
