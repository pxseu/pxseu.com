import React, { FC } from "react";
import { Flex, FlexProps, Heading, Text, chakra } from "@chakra-ui/react";
import Twemoji from "../utils/Twemoji";
import { useTimePassed } from "../../hooks/useTimePassed";
import TimeTooltip from "../utils/TimeTooltip";

const HomeComp: FC = (props: FlexProps) => {
	const age = useTimePassed(1090022400000);
	const codingFor = useTimePassed(1535760000000);

	return (
		<Flex flexDirection="column" alignItems="center" textAlign="center" {...props}>
			<Heading>
				Hello <Twemoji emoji="👋" />
			</Heading>

			<Text fontSize="xl">
				My name is{" "}
				<chakra.span bgGradient="linear(to-r, brand.100, brand.900)" backgroundClip="text">
					<b>pxseu</b>
				</chakra.span>{" "}
				and I am a developer from Poland!
			</Text>

			<Text fontSize="xl">
				I am <TimeTooltip time={age} timeText="years old" /> and I have been coding for over{" "}
				<TimeTooltip time={codingFor} timeText="years" />.
			</Text>
		</Flex>
	);
};

export default HomeComp;
