import Layout from "@/comp/layout";
import { Code, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";

const FourOFour: FC = () => {
	const router = useRouter();

	return (
		<Layout width="100%" textAlign="center">
			{router.pathname === router.asPath ? (
				<>
					<Heading>404 - But you wanted it</Heading>
					<Text>
						You requested the route called <Code>{decodeURI(router.asPath)}</Code> and your request was
						fulfilled!
					</Text>
				</>
			) : (
				<>
					<Heading>404 - Not Found</Heading>
					<Text>
						The route <Code>{decodeURI(router.asPath)}</Code> is not on the server.
					</Text>
				</>
			)}
		</Layout>
	);
};

export default FourOFour;
