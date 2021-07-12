import FormUI from "@/comp/content/MessagePage/Form";
import SEO from "@/comp/content/SEO";
import Layout from "@/comp/layout";
import React, { FC } from "react";

const Home: FC = () => (
	<Layout display="flex" flexDirection="column" alignItems="center" justifyContent="center">
		<SEO description="Drop a message here!" />
		<FormUI />
	</Layout>
);

export default Home;
