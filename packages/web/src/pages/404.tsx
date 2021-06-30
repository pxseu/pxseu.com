import { Box, Heading, Text, Code } from "@chakra-ui/react";
import React, { FC } from "react";
import { useRouter } from "next/router";
import Layout from "@/comp/layout";

const FourOFour: FC = () => {
	const router = useRouter();

	return (
		<Layout>
			<Box width="100%" textAlign="center">
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
			</Box>
		</Layout>
	);
};

export default FourOFour;
