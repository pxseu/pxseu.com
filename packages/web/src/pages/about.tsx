import { Heading, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { InferGetStaticPropsType } from "next";
import { FavouriteAnime, TopSongs } from "@pxseu-dot-com/web";
import Layout from "@/comp/layout";
import { API_ROUTE } from "@/conf/globals";
import FavouriteAnimeComp from "@/comp/content/FavouriteAnime";
import AboutMe from "@/comp/content/AboutMe";
import Twemoji from "@/comp/utils/Twemoji";

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

const About: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ favouriteAnime }) => (
	<Layout display="flex" flexDirection="column" alignItems="center">
		<Heading>
			More stuff about me <Twemoji emoji="👋" />
		</Heading>
		<AboutMe />
		<Text py={2} fontSize="xl" textAlign="center">
			My Favourite Anime so far:
		</Text>
		<FavouriteAnimeComp anime={favouriteAnime} />
		{/* <pre>{JSON.stringify(topSongs.tracks, undefined, 4)}</pre> */}
	</Layout>
);

export default About;
