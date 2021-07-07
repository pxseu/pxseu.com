import AniListIcon from "@/comp/svg/anilist";
import OsuIcon from "@/comp/svg/osu";
import { AniList, Discord, GitHub, Mail, Osu, Spotify, Steam, Twitter } from "@/conf/links";
import { Box, BoxProps, Button, ButtonGroup, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { FaDiscord, FaGithub, FaSpotify, FaSteam, FaTwitter } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const ContactPlaces: FC<BoxProps> = (props) => (
	<Box {...props}>
		<Text mt={4} mb={2} textAlign="center">
			Reach out to me:
		</Text>
		<ButtonGroup size="md" spacing={0} variant="ghost" color="gray.600" flexDirection="column" alignItems="center">
			<Button as="a" href={Discord} aria-label="Discord" leftIcon={<FaDiscord fontSize="20px" />} target="_blank">
				Discord
			</Button>
			<Button as="a" href={GitHub} aria-label="GitHub" leftIcon={<FaGithub fontSize="20px" />} target="_blank">
				GitHub
			</Button>
			<Button as="a" href={Twitter} aria-label="Twitter" leftIcon={<FaTwitter fontSize="20px" />} target="_blank">
				Twitter
			</Button>
			<Button as="a" href={Mail} aria-label="Discord" leftIcon={<IoIosMail fontSize="22px" />} target="_blank">
				Mail
			</Button>
		</ButtonGroup>

		<Text my={2} textAlign="center">
			Misc:
		</Text>

		<ButtonGroup size="md" spacing={0} variant="ghost" color="gray.600" flexDirection="column" alignItems="center">
			<Button as="a" href={Spotify} aria-label="Spotify" leftIcon={<FaSpotify fontSize="20px" />} target="_blank">
				Spotify
			</Button>
			<Button
				as="a"
				href={AniList}
				aria-label="AniList"
				leftIcon={<AniListIcon fontSize="20px" />}
				target="_blank"
			>
				AniList
			</Button>
			<Button as="a" href={Steam} aria-label="Steam" leftIcon={<FaSteam fontSize="20px" />} target="_blank">
				Steam
			</Button>
			<Button as="a" href={Osu} aria-label="Osu" leftIcon={<OsuIcon fontSize="20px" />} target="_blank">
				Osu
			</Button>
		</ButtonGroup>
	</Box>
);

export default ContactPlaces;
