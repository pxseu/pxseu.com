import { Flex, FlexProps } from "@chakra-ui/react";
import { GithubResponse } from "@pxseu-dot-com/web";
import React, { FC } from "react";
import RepositoryCard from "../utils/RepositoryCard";

interface IProjects extends FlexProps {
	githubData: GithubResponse;
}

const Projects: FC<IProjects> = ({ githubData, ...props }) => (
	<Flex
		maxWidth="1000px"
		justifyContent={["flex-start", "center"]}
		flexDirection={["column", "row"]}
		flexWrap="wrap"
		alignItems="stretch"
		/* flexWrap="wrap" */ {...props}
	>
		{githubData.data.map((repo) => (
			<RepositoryCard repository={repo} key={`${repo.owner}/${repo.name}`} minWidth={["unset", "300px"]} />
		))}
	</Flex>
);

export default Projects;
