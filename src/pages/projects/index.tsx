import DefaultLayout from "../../components/DefaultLayout";

const Projects = () => (
	<div>
		<DefaultLayout title={"My Projects"}>
			<p>
				<a href='https://github.com/PreMiD/Discord-Bot'>
					Little work on the PreMiD bot
				</a>
			</p>
			<p>
				<a href='https://short.pxseu.com/'>Url shrinker!</a>
			</p>
			<p>
				<a href='https://cdn.pxseu.com/'>File uploader!</a>
			</p>
			<p>
				<a href='https://chat.pxseu.com/'>Chat App!</a>
			</p>
			<p>
				<a href='https://dash.pxseu.com/'>Dasboard for my apps!</a>
			</p>
			<p>
				<a href='https://github.com/pxseu/pxseu.com'>This website!</a>
			</p>
			<p>
				<a href='https://github.com/pxseu/ZeroTwoBot'>
					My own Discord bot
				</a>
			</p>
		</DefaultLayout>
	</div>
);

export default Projects;
