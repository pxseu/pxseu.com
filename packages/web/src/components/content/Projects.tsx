import { Flex, FlexProps } from "@chakra-ui/react";
import { GithubResponse } from "@pxseu-dot-com/web";
import React, { FC } from "react";
import RepositoryCard from "../utils/RepositoryCard";

interface IProjects extends FlexProps {
	githubData: GithubResponse;
}

const Projects: FC<IProjects> = ({ githubData, ...props }) => (
	<Flex
		justifyContent={["flex-start", "center"]}
		flexDirection="column"
		alignItems="stretch"
		/* flexWrap="wrap" */ {...props}
	>
		{githubData.data.map((repo) => (
			<RepositoryCard repository={repo} key={`${repo.owner}/${repo.name}`} />
		))}
	</Flex>
);

export default Projects;
