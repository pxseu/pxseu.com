import FormUI from "@/comp/content/MessagePage/Form";
import SEO from "@/comp/content/SEO";
import Layout from "@/comp/layout";
import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";

const Home: FC = () => (
	<Layout display="flex" flexDirection="column" alignItems="center" justifyContent="center">
		<SEO description="Drop a message here!" />

		<Flex justifyContent={["center"]} alignItems="center" flexWrap="wrap" width="100%">
			<FormUI />
		</Flex>
	</Layout>
);

export default Home;
