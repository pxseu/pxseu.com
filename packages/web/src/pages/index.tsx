import NowPlaying from "@/comp/api/NowPlaying";
import HomeComp from "@/comp/content/Home";
import SEO from "@/comp/content/SEO";
import Layout from "@/comp/layout";
import { Flex } from "@chakra-ui/react";

import React, { FC } from "react";

const Home: FC = () => (
	<Layout display="flex" flexDirection="column" alignItems="center" justifyContent="center">
		<SEO />
		<HomeComp />

		<Flex justifyContent={["center"]} alignItems="center" flexWrap="wrap" width="100%">
			<NowPlaying mt="4" minWidth="200px" />
		</Flex>
	</Layout>
);

export default Home;
