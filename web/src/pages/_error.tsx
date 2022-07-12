import Layout from "@/comp/layout";
import { Heading, Text } from "@chakra-ui/react";
import { NextPageContext } from "next";
import React, { FC } from "react";

interface ErrorComponentProps {
	statusCode: number;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ statusCode }) => (
	<Layout display="flex" flexDirection="column" alignItems="center">
		<Heading>An Error occured</Heading>
		<Text fontSize="lg">
			{statusCode ? `An error ${statusCode} occurred on server` : "An unknown error occurred on client"}
		</Text>
	</Layout>
);

const getStatusCode = (res: NextPageContext["res"], err: NextPageContext["err"]) => {
	if (res) return res.statusCode;
	if (err) return err.statusCode;
	return 500;
};

export const getInitialProps = ({ res, err }: NextPageContext) => ({
	statusCode: getStatusCode(res, err),
});

export default ErrorComponent;
