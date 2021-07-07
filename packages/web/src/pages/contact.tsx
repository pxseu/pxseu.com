import React, { FC } from "react";

import Layout from "@/comp/layout";
import { Heading } from "@chakra-ui/react";
import Twemoji from "@/comp/utils/Twemoji";
import ContactPlaces from "@/comp/content/ContactPlaces";

const Home: FC = () => (
	<Layout display="flex" flexDirection="column" alignItems="center">
		<Heading>
			Contact me <Twemoji emoji="📱" />
		</Heading>

		<ContactPlaces />
	</Layout>
);

export default Home;
