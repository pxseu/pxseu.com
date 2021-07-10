import FormUI from "@/comp/content/MessagePage/Form";
import Layout from "@/comp/layout";
import React, { FC } from "react";

const Home: FC = () => (
	<Layout display="flex" flexDirection="column" alignItems="center" justifyContent="center">
		<FormUI />
	</Layout>
);

export default Home;
