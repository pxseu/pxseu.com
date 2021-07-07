import React, { FC } from "react";
import { Flex, FlexProps, Link, Text } from "@chakra-ui/react";
import { useTimePassed } from "@/hooks/useTimePassed";
import NextLink from "next/link";

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
			maxWidth="580px"
			{...props}
		>
			<Text fontSize="lg">
				Since you&apos;re here allow me to introduce myself once again. My name is pxseu and I&apos;m a{" "}
				{Math.floor(age)} year old software and web developer from Poland with over {Math.floor(codingFor)}{" "}
				years of experience. I love free and open source software but like most of us I use a huge amount of
				proprietary software. In my free time I usually listen to &quot;emo/sad&quot; songs or watch anime
				thought recently I hardly find time for it now. Helping others solve programming issues brings me a lot
				of joy and is one of the reasons why I love open source so much. Feel free to message me anywhere in{" "}
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
