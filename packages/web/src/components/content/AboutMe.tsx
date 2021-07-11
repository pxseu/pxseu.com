import { GITHUB_ID } from "@/conf/globals";
import { useTimePassed } from "@/hooks/useTimePassed";
import { Box, Flex, FlexProps, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { FC } from "react";
import Image from "next/image";

const IMAGE_SMALL = 150;
const IMAGE_LARGE = 200;

const AboutComp: FC<FlexProps> = (props) => {
	const age = useTimePassed(1090022400000);
	const codingFor = useTimePassed(1535760000000);

	return (
		<Flex
			backgroundColor="blackAlpha.400"
			p={4}
			mt={2}
			borderRadius={10}
			boxShadow="md"
			flexDirection={["column", "column", "row", "row"]}
			justifyContent="center"
			alignItems="center"
			{...props}
		>
			<Flex bgGradient="linear(to-r, brand.100, brand.900)" borderRadius={100} margin={3} padding={0.5}>
				<Box
					background="gray.800"
					width={{
						md: IMAGE_LARGE,
						base: IMAGE_SMALL,
					}}
					height={{
						md: IMAGE_LARGE,
						small: IMAGE_SMALL,
					}}
					borderRadius={100}
					overflow="hidden"
					flexShrink={0}
					fontSize={0} // next image is so so so so so so so so stupid
					boxShadow="md"
				>
					<Image
						src={`https://avatars.githubusercontent.com/u/${GITHUB_ID}`}
						width={300}
						height={300}
						alt="My Github Avatar"
					/>
				</Box>
			</Flex>

			<Text fontSize="lg" padding={3}>
				Since you&apos;re here allow me to introduce myself once again. My name is pxseu and I&apos;m a{" "}
				{Math.floor(age)} year old software and web developer from Poland with over {Math.floor(codingFor)}{" "}
				years of experience. I love free and open source software but like most of us I use a huge amount of
				proprietary software. In my free time I usually listen to “emo/sad” songs or watch anime, but recently I
				haven’t had much time for that. Helping others solve programming issues brings me a lot of joy and is
				one of the reasons why I love open source so much. Feel free to message me anywhere in{" "}
				<NextLink href="/contact" passHref>
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
						/contact
					</Link>
				</NextLink>
				.
			</Text>
		</Flex>
	);
};

export default AboutComp;
