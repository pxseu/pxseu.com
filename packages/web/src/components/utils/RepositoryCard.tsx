import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { Repository } from "@pxseu-dot-com/web";
import React, { FC } from "react";
import { GoIssueOpened, GoGitPullRequest, GoGitCommit, GoStar, GoRepoForked } from "react-icons/go";

interface IRepositoryCard {
	repository: Repository;
	key: string;
}

const RepositoryCard: FC<IRepositoryCard> = ({ repository, ...props }) => (
	<Flex
		as="a"
		flexDirection="column"
		background="gray.900"
		padding={3}
		margin={2}
		maxWidth={600}
		flexGrow={1}
		boxShadow="md"
		borderRadius={10}
		_focus={{
			outline: "none",
			boxShadow: "var(--chakra-shadows-outline)",
		}}
		href={repository.url}
		target="_blank"
		rel="noreferrer"
		{...props}
	>
		<Flex flexDirection="column">
			<Text fontSize={20} p={2}>
				<b>{`${repository.owner}/${repository.name}`}</b>
			</Text>
			<Stack direction="row" spacing={2} mt={1} flexWrap="wrap">
				<Flex>
					<GoStar fontSize={20} />
					<Text ml={1}>{repository.stargazers ?? 0}</Text>
				</Flex>
				<Flex>
					<GoIssueOpened fontSize={20} />
					<Text ml={1}>{repository.issues ?? 0}</Text>
				</Flex>
				<Flex>
					<GoRepoForked fontSize={20} />
					<Text ml={1}>{repository.forks ?? 0}</Text>
				</Flex>
				<Flex>
					<GoGitPullRequest fontSize={20} />
					<Text ml={1}>{repository.pullRequests ?? 0}</Text>
				</Flex>
				<Flex>
					<GoGitCommit fontSize={20} />
					<Text ml={1}>{repository.commitCount ?? 0}</Text>
				</Flex>
			</Stack>

			<Flex mt={1}>
				<Box
					mt={0.5}
					display="inline-block"
					background={repository.language.color}
					borderRadius={100}
					width={4}
					height={4}
				/>
				<Text ml={1}>{repository.language.name}</Text>
			</Flex>
		</Flex>
		<Divider borderBottomColor="white" borderBottomWidth={2} my={2} />
		<Text mt={1}>{repository.description}</Text>
		{/* <pre key={key}>{JSON.stringify(repository, null, 2)}</pre> */}
	</Flex>
);

export default RepositoryCard;
