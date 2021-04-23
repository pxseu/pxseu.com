import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { StyledLink } from "../components/LinkText";
import commentStyles from "../styles/pages/Comment.module.css";
import styles from "../styles/pages/Projects.module.css";

const Projects = (): JSX.Element => (
	<DefaultLayout title={"My Projects"}>
		<div className="center">
			<h3>Bellow are some projects I worked on!</h3>
			<div className={styles.projectsWrapper}>
				<StyledLink href="//github.com/imperialbin/imperial-node">Imperial Node</StyledLink>

				<StyledLink href="//github.com/pxseu/pxseu.com">This website!</StyledLink>

				<StyledLink href="//github.com/pxseu/ZeroTwoBot">My own Discord bot</StyledLink>

				<StyledLink href="//short.pxseu.com/">Url shrinker!</StyledLink>

				<StyledLink href="//cdn.pxseu.com/">File uploader!</StyledLink>

				<StyledLink href="//dash.pxseu.com/">Dasboard for my apps!</StyledLink>

				<p className={commentStyles.comment}>
					<i>psst these are links!</i>
				</p>
			</div>
		</div>
	</DefaultLayout>
);

export default Projects;
