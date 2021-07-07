import ContactPlaces from "@/comp/content/ContactPlaces";
import Layout from "@/comp/layout";
import Twemoji from "@/comp/utils/Twemoji";
import { Heading } from "@chakra-ui/react";
import React, { FC } from "react";


const Home: FC = () => (
	<Layout display="flex" flexDirection="column" alignItems="center">
		<Heading>
			Contact me <Twemoji emoji="📱" />
		</Heading>

		<ContactPlaces />
	</Layout>
);

export default Home;
