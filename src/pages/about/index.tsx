import DefaultLayout from "../../components/DefaultLayoutImage";
import Twemoji from "../../components/Twemoji";

const About = () => {
	return (
		<>
			<DefaultLayout title={"About me!"} video="/videos/pfp.mp4">
				<h2>
					Hey <Twemoji emoji="👋" />
				</h2>
				<p>
					I'm <span className="me">pxseu</span>!
				</p>
				<p>I'm a 16 year old developer from Poland.</p>
				<p>
					I work in <mark className="impMark">Frontend</mark> and{" "}
					<mark className="impMark">Backend</mark> areas.
				</p>
				<p>
					I enjoy making <mark className="impMark">Api</mark>'s, and other small scripts.
				</p>
				<p>I use:</p>
				<p>
					<img
						className="badge noselect"
						draggable="false"
						src="/assets/svg/typescript.svg"
						alt="TypeScript"
						onDragStart={() => false}
					/>
					<img
						className="badge noselect"
						draggable="false"
						src="/assets/svg/javascript.svg"
						alt="JavaScript"
						onDragStart={() => false}
					/>
					<img
						className="badge noselect"
						draggable="false"
						src="/assets/svg/nextjs.svg"
						alt="Next.js"
						onDragStart={() => false}
					/>
					<img
						className="badge noselect"
						draggable="false"
						src="/assets/svg/react.svg"
						alt="React"
						onDragStart={() => false}
					/>

					<img
						className="badge noselect"
						draggable="false"
						src="/assets/svg/mongodb.svg"
						alt="MongoDB"
						onDragStart={() => false}
					/>
					<img
						className="badge noselect"
						draggable="false"
						src="/assets/svg/vscode.svg"
						alt="vsCode"
						onDragStart={() => false}
					/>
					<img
						className="badge noselect"
						draggable="false"
						src="/assets/svg/git.svg"
						alt="Git"
						onDragStart={() => false}
					/>
				</p>
			</DefaultLayout>
			<style jsx>{`
				.impMark,
				.jsMark,
				.tsMark {
					color: #ff3232;
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

				.badge {
					display: inline-block;
					width: auto;
					height: 1.8rem;
					vertical-align: -0.125em;
				}
			`}</style>
		</>
	);
};

export default About;
