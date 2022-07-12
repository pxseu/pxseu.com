import AboutMe from "@/comp/content/AboutMe";
import FavouriteAnimeComp from "@/comp/content/FavouriteAnime";
import FavouriteSongsComp from "@/comp/content/FavouriteSongs";
import SEO from "@/comp/content/SEO";
import Layout from "@/comp/layout";
import Twemoji from "@/comp/utils/Twemoji";
import { API_ROUTE } from "@/conf/globals";
import { Heading, Text } from "@chakra-ui/react";
import { FavouriteAnime, TopSongs } from "@pxseu-dot-com/web";
import { InferGetStaticPropsType } from "next";
import React, { FC } from "react";

export const getStaticProps = async () => {
	const [topSongsRes, topAnimeRes] = await Promise.all([
		fetch(`${API_ROUTE}/v2/spotify/topSongs`),
		fetch(`${API_ROUTE}/v2/anilist/favourites`),
	]);

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
	<Layout display="flex" flexDirection="column" alignItems="center">
		<SEO description="Curious about me? Read some stuff here!" />
		<Heading>
			About me <Twemoji emoji="📝" />
		</Heading>

		<AboutMe maxWidth="880px" mt={3} />

		<Text pt={4} fontSize="xl" textAlign="center">
			Here are some of my favourite songs:
		</Text>

		<FavouriteSongsComp maxWidth="1000px" pt={2} songs={topSongs} />

		<Text pt={4} fontSize="xl" textAlign="center">
			Here are some of my favourite anime:
		</Text>

		<FavouriteAnimeComp maxWidth="1200px" pt={2} anime={favouriteAnime} />
	</Layout>
);

export default About;
