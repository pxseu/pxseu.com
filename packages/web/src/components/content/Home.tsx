import React, { FC } from "react";
import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import Twemoji from "@/comp/utils/Twemoji";
import ShortSummary from "./ShortSummary";

const HomeComp: FC = (props: FlexProps) => (
	<Flex flexDirection="column" alignItems="center" textAlign="center" {...props}>
		<Heading>
			Hello <Twemoji emoji="👋" />
		</Heading>

		<ShortSummary />
	</Flex>
);

export default HomeComp;
