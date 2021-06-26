import { Flex, Text, Tooltip } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface CardProps {
	image: ReactNode;
	title: ReactNode;
	artists?: ReactNode;
	album?: ReactNode;
	imageTooltip?: string;
	isNoData?: boolean;
}

const NowPlayingCard: FC<CardProps> = ({ image, title, artists, album, imageTooltip, isNoData }) => (
	<Flex
		display="inline-flex"
		backgroundColor="blackAlpha.500"
		p={2.5}
		borderRadius={10}
		boxShadow="xl"
		alignItems="center"
	>
		<Tooltip label={imageTooltip} aria-label="A tooltip" hasArrow placement="top">
			<Flex
				borderRadius={8}
				overflow="hidden"
				justifyContent="center"
				alignItems="center"
				boxShadow="md"
				width={100}
				height={100}
			>
				{image}
			</Flex>
		</Tooltip>
		<Flex
			flexDirection="column"
			justifyContent="space-between"
			py={2}
			px={{ base: "2", md: "4" }}
			overflow="hidden"
			maxWidth={{ base: "200", md: "300", xl: "500" }}
		>
			<Text fontSize={isNoData ? "xl" : "2xl"} isTruncated={!isNoData}>
				{title}
			</Text>
			{artists && <Text isTruncated>{artists}</Text>}
			{album && <Text isTruncated>{album}</Text>}
		</Flex>
	</Flex>
);

export default NowPlayingCard;
