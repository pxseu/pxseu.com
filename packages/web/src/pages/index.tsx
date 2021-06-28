import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";

import Layout from "../components/layout";
import NowPlaying from "../components/api/NowPlaying";
import HomeComp from "../components/content/Home";

const Home: FC = () => (
	<Layout>
		<Flex flexDirection="column" alignItems="center">
			<HomeComp />

			<NowPlaying mt="4" />
		</Flex>
	</Layout>
);

export default Home;
