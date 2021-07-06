import React, { FC } from "react";
import { Flex, FlexProps, Text, chakra, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useTimePassed } from "@/hooks/useTimePassed";
import TimeTooltip from "@/comp/utils/TimeTooltip";

const ShortSummary: FC = (props: FlexProps) => {
	const age = useTimePassed(1090022400000);
	const codingFor = useTimePassed(1535760000000);

	return (
		<Flex flexDirection="column" justifyContent="center" textAlign="center" {...props}>
			<Text fontSize="xl">
				My name is{" "}
				<chakra.span bgGradient="linear(to-r, brand.100, brand.900)" backgroundClip="text">
					<b>pxseu</b>
				</chakra.span>{" "}
				and I am a software/web developer from Poland!
			</Text>

			<Text fontSize="xl">
				I am <TimeTooltip time={age} timeText="years old" /> and I have been coding for over{" "}
				<TimeTooltip time={codingFor} timeText="years" />.
			</Text>

			<Text fontSize="xl">
				You can read more in{" "}
				<NextLink href="/about" passHref>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<Link
						variant="link"
						transitionProperty="text-decoration-color"
						transitionDuration="200ms"
						textDecoration="underline"
						textDecorationColor="brand.100"
						textDecorationThickness="2px"
						_hover={{
							textDecorationColor: "brand.900",
						}}
					>
						/about
					</Link>
				</NextLink>
				.
			</Text>
		</Flex>
	);
};

export default ShortSummary;
