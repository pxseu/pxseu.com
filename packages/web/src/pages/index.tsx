import React, { FC } from "react";

import Layout from "@/comp/layout";
import NowPlaying from "@/comp/api/NowPlaying";
import HomeComp from "@/comp/content/Home";

const Home: FC = () => (
	<Layout display="flex" flexDirection="column" alignItems="center">
		<HomeComp />

		<NowPlaying mt="4" />
	</Layout>
);

export default Home;
