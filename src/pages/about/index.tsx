import React from "react";
import DefaultLayout from "../../components/DefaultLayoutMedia";
import Twemoji from "../../components/Twemoji";
import BadgeComp from "../../components/Badge";
import Age from "../../components/Age";

const About = (): JSX.Element => (
	<>
		<DefaultLayout title="About me!" image="/images/pfp.png" mediaType="image">
			<h2>
				Hey <Twemoji emoji="👋" />
			</h2>
			<p>
				I&rsquo;m{" "}
				<span className="me">pxseu</span>!
			</p>
			<p>
				I&rsquo;m a <Age timestamp={1090022400000} /> year old developer from Poland.
			</p>
			<p>I work in Frontend and Backend areas.</p>
			<p>I enjoy making Api&rsquo;s, and other small scripts.</p>
			<p>I use:</p>
			<p>
				<BadgeComp badge="typescript" />
				<BadgeComp badge="javascript" />
				<BadgeComp badge="nextjs" />
				<BadgeComp badge="react" />
				<BadgeComp badge="mongodb" />
				<BadgeComp badge="vscode" />
				<BadgeComp badge="git" />
			</p>
		</DefaultLayout>
		<style jsx>{`
			.jsMark,
			.tsMark {
				fontweight: bolder;
				background: none;
			}
			.jsMark {
				color: #f0db4f;
			}
			.tsMark {
				color: #3178c6;
			}

			.me {
				color: #ffa9ff;
				font-family: "Gang of Three", Verdana, Arial;
				font-size: 22px;
			}
		`}</style>
	</>
);

export default About;
