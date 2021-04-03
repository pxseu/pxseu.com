import React from "react";
import BadgeComp from "../components/Badge";

const Badges = (): JSX.Element => {
	return (
		<div className="badges center">
			<a href="//www.typescriptlang.org/" target="_blank" rel="noreferrer">
				<BadgeComp badge="typescript" />
			</a>
			<a href="//www.javascript.com/" target="_blank" rel="noreferrer">
				<BadgeComp badge="javascript" />
			</a>
			<a href="//nextjs.org/" target="_blank" rel="noreferrer">
				<BadgeComp badge="nextjs" />
			</a>
			<a href="//reactjs.org/" target="_blank" rel="noreferrer">
				<BadgeComp badge="react" />
			</a>
			<a href="//www.mongodb.com/" target="_blank" rel="noreferrer">
				<BadgeComp badge="mongodb" />
			</a>
			<a href="//git-scm.com/" target="_blank" rel="noreferrer">
				<BadgeComp badge="git" />
			</a>
			<a href="//jestjs.io/" target="_blank" rel="noreferrer">
				<BadgeComp badge="jest" />
			</a>
			<a href="//webpack.js.org/" target="_blank" rel="noreferrer">
				<BadgeComp badge="webpack" />
			</a>
			<a href="//nodejs.org/" target="_blank" rel="noreferrer">
				<BadgeComp badge="node" />
			</a>
			<a href="//pm2.keymetrics.io/" target="_blank" rel="noreferrer">
				<BadgeComp badge="pm2" />
			</a>
			<a href="//eslint.org/" target="_blank" rel="noreferrer">
				<BadgeComp badge="eslint" />
			</a>
			<a href="//archlinux.org/" target="_blank" rel="noreferrer">
				<BadgeComp badge="arch" />
			</a>
			<a href="//yarnpkg.com/" target="_blank" rel="noreferrer">
				<BadgeComp badge="yarn" />
			</a>
			<a href="//expressjs.com/" target="_blank" rel="noreferrer">
				<BadgeComp badge="express" />
			</a>
			<a href="//prettier.io/" target="_blank" rel="noreferrer">
				<BadgeComp badge="prettier" />
			</a>
			<a href="//code.visualstudio.com/" target="_blank" rel="noreferrer">
				<BadgeComp badge="vscode" />
			</a>
			<a href="//imperialb.in/" target="_blank" rel="noreferrer">
				<BadgeComp badge="imperial" />
			</a>
		</div>
	);
};

export default Badges;
