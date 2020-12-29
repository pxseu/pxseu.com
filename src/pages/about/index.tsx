import dynamic from "next/dynamic";
import DefaultLayout from "../../components/DefaultLayoutMedia";
import Twemoji from "../../components/Twemoji";
import BadgeComp from "../../components/Badge";

const Age = dynamic(() => import("../../components/Age"), {
	ssr: false,
});

const About = () => {
	return (
		<>
			<DefaultLayout title="About me!" image="/images/pfp.png" mediaType="image">
				<h2>
					Hey <Twemoji emoji="👋" />
				</h2>
				<p>
					I'm <span className="me">pxseu</span>!
				</p>
				<p>
					I'm a <Age timestamp={1090022400000} /> year old developer from Poland.
				</p>
				<p>I work in Frontend and Backend areas.</p>
				<p>I enjoy making Api's, and other small scripts.</p>
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
};

export default About;
