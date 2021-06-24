import { Box, Heading, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Twemoji from "../components/utils/Twemoji";
import Layout from "../components/layout";

const Home: FC = () => (
	<Layout>
		<Box width="100%" textAlign="center">
			<Heading>
				Hello <Twemoji emoji="👋" />
			</Heading>
			<Text fontSize="xl">I&apos;m pxseu</Text>
		</Box>
	</Layout>
);

export default Home;
