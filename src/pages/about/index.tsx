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
					I work <mark className="impMark">Front</mark> and{" "}
					<mark className="impMark">Back</mark> End area.
				</p>
				<p>
					I enjoy to make <mark className="impMark">Api</mark>'s, some basic JavaScript
					stuff and more.
				</p>
				<p>I have experience with:</p>
				<p>
					<img
						className="badge"
						src="https://img.shields.io/badge/-TypeScript-007acc?style=flat-square&logo=typescript&logoColor=white"
						alt="TypeScript"
					/>
					<img
						className="badge"
						src="https://img.shields.io/badge/-JavaScript-edb200?style=flat-square&logo=javascript&logoColor=white"
						alt="JavaScript"
					/>
					<img
						className="badge"
						src="https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"
						alt="Next.js"
					/>
					<img
						className="badge"
						src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white"
						alt="React"
					/>

					<img
						className="badge"
						src="https://img.shields.io/badge/-mongoDB-4fb23f?style=flat-square&logo=mongodb&logoColor=white"
						alt="MongoDB"
					/>
					<img
						className="badge"
						src="https://img.shields.io/badge/-Visual Studio Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white"
						alt="vsCode"
					/>
					<img
						className="badge"
						src="https://img.shields.io/badge/-Git-f05033?style=flat-square&logo=git&logoColor=white"
						alt="Git"
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
