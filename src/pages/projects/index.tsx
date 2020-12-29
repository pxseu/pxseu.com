import React from "react";
import DefaultLayout from "../../components/DefaultLayout";

const Projects = (): JSX.Element => (
	<div>
		<DefaultLayout title={"My Projects"}>
			<p>
				<a href="https://github.com/PreMiD/Discord-Bot">Little work on the PreMiD bot</a>
			</p>
			<p>
				<a href="https://short.pxseu.com/">Url shrinker!</a>
			</p>
			<p>
				<a href="https://cdn.pxseu.com/">File uploader!</a>
			</p>
			<p>
				<a href="https://chat.pxseu.com/">Chat App!</a>
			</p>
			<p>
				<a href="https://dash.pxseu.com/">Dasboard for my apps!</a>
			</p>
			<p>
				<a href="https://github.com/pxseu/pxseu.com">This website!</a>
			</p>
			<p>
				<a href="https://github.com/pxseu/ZeroTwoBot">My own Discord bot</a>
			</p>
			<p className="comment">
				<i>psst these are links!</i>
			</p>
		</DefaultLayout>
		<style jsx>{`
			.comment {
				color: #fff;
				text-decoration: underline #ffa9ff;
				transition-duration: 0.3s;
			}
			.comment:hover {
				color: #ffa9ff;
				text-decoration: underline #fff;
			}
		`}</style>
	</div>
);

export default Projects;
