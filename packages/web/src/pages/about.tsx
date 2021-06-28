import { Flex, Heading } from "@chakra-ui/react";
import React, { FC } from "react";
import { InferGetStaticPropsType } from "next";
import Layout from "../components/layout";
import { API_ROUTE } from "../config/globals";
import { TopSongs } from "../types/TopSongs";
import { FavouriteAnime } from "../types/FavouriteAnime";

export const getStaticProps = async () => {
	const topSongsRes = await fetch(`${API_ROUTE}/v2/spotify/topSongs`);
	const topAnimeRes = await fetch(`${API_ROUTE}/v2/anilist/favourites`);

	const [topSongs, favouriteAnime] = (await Promise.all([topSongsRes, topAnimeRes]).then((resArr) =>
		Promise.all(resArr.map((res) => res.json())),
	)) as [TopSongs, FavouriteAnime];

	return {
		props: {
			topSongs,
			favouriteAnime,
		},
		revalidate: 60,
	};
};

const About: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ favouriteAnime, topSongs }) => (
	<Layout>
		<Flex flexDirection="column" alignItems="center">
			<Heading>yeah tooo!!!</Heading>
		</Flex>
		<pre>{JSON.stringify(favouriteAnime.data, undefined, 4)}</pre>
		<pre>{JSON.stringify(topSongs.tracks, undefined, 4)}</pre>
	</Layout>
);

export default About;
