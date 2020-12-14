import DefaultLayout from "../../components/DefaultLayoutImage";

const About = () => {
	return (
		<>
			<DefaultLayout title={"About me!"} image="/images/pfp.gif">
				<p>I'm a Front and Back End developer.</p>
				<p>I enjoy to make Api's, some basic javascript stuff and more.</p>
				<p>I mostly use these languages:</p>
				<p>TS, JS</p>
				<p>I have experience with:</p>
				<p>Next.js, React, Express, MongoDB, Discord.js, EJS, Websockets, REST Api's</p>
				<p></p>
			</DefaultLayout>
		</>
	);
};

export default About;
