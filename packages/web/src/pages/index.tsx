import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";

import Layout from "@/comp/layout";
import NowPlaying from "@/comp/api/NowPlaying";
import HomeComp from "@/comp/content/Home";

const Home: FC = () => (
	<Layout>
		<Flex flexDirection="column" alignItems="center">
			<HomeComp />

			<NowPlaying mt="4" />
		</Flex>
	</Layout>
);

export default Home;
