import ContactPlaces from "@/comp/content/ContactPlaces";
import SEO from "@/comp/content/SEO";
import Layout from "@/comp/layout";
import Twemoji from "@/comp/utils/Twemoji";
import { Heading } from "@chakra-ui/react";
import React, { FC } from "react";

const Home: FC = () => (
	<Layout display="flex" flexDirection="column" alignItems="center">
		<SEO description="Wanna talk? Find me here." />
		<Heading>
			Contact me <Twemoji emoji="📱" />
		</Heading>

		<ContactPlaces />
	</Layout>
);

export default Home;
