import {
	Box,
	Button,
	Flex,
	FlexProps,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { FavouriteAnime as TFavouriteAnime } from "@pxseu-dot-com/web";
import Image from "next/image";
import React, { FC, useState } from "react";

const THUMB_WIDTH = 100;
const THUMB_HEIGHT = 150;
const BANNER_HEIGHT = 120;

interface IFavouriteAnime extends FlexProps {
	anime: TFavouriteAnime;
}

const FavouriteAnime: FC<IFavouriteAnime> = ({ anime, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalContent, setModalContent] = useState<TFavouriteAnime["data"][0] | null>(null);

	return (
		<Flex
			justifyContent="center"
			flexDirection={["column", "row"]}
			alignItems="center"
			flexWrap="wrap"
			width="100%"
			{...props}
		>
			{anime.data.map((data) => (
				<Flex
					flex={1}
					display="flex"
					backgroundColor="blackAlpha.400"
					p={2.5}
					m="2"
					width="90%"
					minWidth={[THUMB_WIDTH * 2, THUMB_WIDTH * 3]}
					borderRadius={10}
					boxShadow="md"
					key={data.order}
					transition="box-shadow, transform ease-in-out 100ms"
					onClick={({ target, currentTarget }) => {
						if (target !== currentTarget) return;

						setModalContent(data);
						onOpen();
					}}
					onKeyPress={({ key, target, currentTarget }) => {
						if (target !== currentTarget) return;
						if (key !== "Enter") return;

						setModalContent(data);
						onOpen();
					}}
					cursor="pointer"
					_hover={{
						boxShadow: "lg",
						transform: "scale(1.02, 1.02)",
					}}
					flexDirection={["column", "row"]}
					alignItems="center"
					_focus={{
						outline: "none",
						boxShadow: "var(--chakra-shadows-outline)",
					}}
					tabindex="0"
				>
					<Flex
						borderRadius={8}
						overflow="hidden"
						justifyContent="center"
						alignItems="center"
						boxShadow="md"
						minWidth={THUMB_WIDTH}
						width={THUMB_WIDTH}
						height={THUMB_HEIGHT}
					>
						{data.blurImage ? (
							<Image
								placeholder="blur"
								blurDataURL={data.blurImage}
								height={THUMB_HEIGHT * 2}
								width={THUMB_WIDTH * 2}
								src={data.image}
								alt={`${data.title} cover image`}
							/>
						) : (
							<Image
								height={THUMB_HEIGHT * 2}
								width={THUMB_WIDTH * 2}
								src={data.image}
								alt={`${data.title} cover image`}
							/>
						)}
					</Flex>
					<Flex py={2} px={4} width="100%" flexDirection="column" justifyContent="center" overflow="hidden">
						<Text
							fontSize="xl"
							textAlign={["center", "left"]}
							isTruncated
							title={`${data.title} (${data.releaseYear})`}
						>
							<b>{data.title}</b>
						</Text>
						<Flex flexWrap="wrap" justifyContent={["center", "flex-start"]}>
							{data.genres.slice(0, 3).map((genra) => (
								<Button
									as="a"
									fontWeight="normaal"
									variant="ghost"
									size="sm"
									borderRadius="5"
									target="_blank"
									rel="noreferrer"
									m={0.5}
									href={`https://anilist.co/search/anime/${encodeURIComponent(genra)}`}
									key={genra}
								>
									<Text>{genra}</Text>
								</Button>
							))}
						</Flex>
					</Flex>
				</Flex>
			))}
			<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{modalContent?.title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{modalContent?.banner && (
							<Box
								position="relative"
								boxShadow="md"
								width="100%"
								maxHeight={BANNER_HEIGHT}
								height={BANNER_HEIGHT}
								overflow="hidden"
							>
								{modalContent?.blurImage ? (
									<Image
										layout="fill"
										objectFit="cover"
										placeholder="blur"
										quality="90"
										blurDataURL={modalContent.blurImage}
										src={modalContent.banner}
										alt={`${modalContent.title} cover image`}
									/>
								) : (
									<Image
										layout="fill"
										objectFit="cover"
										quality="90"
										src={modalContent?.banner}
										alt={`${modalContent?.title} cover image`}
									/>
								)}
							</Box>
						)}

						<Text
							mt={4}
							/* eslint-disable-next-line react/no-danger */
							dangerouslySetInnerHTML={{
								__html:
									modalContent?.description ??
									"Current version of the API does not have the content.",
							}}
						/>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button as="a" href={modalContent?.siteUrl} target="_blank" variant="ghost">
							View on AniList
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default FavouriteAnime;
