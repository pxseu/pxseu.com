import TimeTooltip from "@/comp/utils/TimeTooltip";
import { BIRTHDAY_TIMESTAMP, CODING_START_TIMESTAMP } from "@/conf/globals";
import { useTimePassed } from "@/hooks/useTimePassed";
import { chakra, Flex, FlexProps, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { FC } from "react";

const ShortSummary: FC = (props: FlexProps) => {
	const age = useTimePassed(BIRTHDAY_TIMESTAMP);
	const codingFor = useTimePassed(CODING_START_TIMESTAMP);

	return (
		<Flex flexDirection="column" justifyContent="center" textAlign="center" {...props}>
			<Text fontSize="xl">
				My name is{" "}
				<chakra.span bgGradient="linear(to-r, brand.100, brand.900)" backgroundClip="text">
					<b>pxseu</b>
				</chakra.span>{" "}
				and I&apos;m a software/web developer from Poland!
			</Text>

			<Text fontSize="xl">
				I&apos;m <TimeTooltip time={age} timeText="years old" whiteSpace="nowrap" /> and I&apos;ve been coding
				for over <TimeTooltip time={codingFor} timeText="years" whiteSpace="nowrap" />.
			</Text>

			<Text fontSize="xl">
				You can read more in{" "}
				<NextLink href="/about" passHref>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<Link
						variant="link"
						transitionProperty="text-decoration-color"
						transitionDuration="400ms"
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
