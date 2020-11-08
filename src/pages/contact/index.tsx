import Head from "next/head";
import DefaultLayout from "../../components/DefaultLayout";

const Contact = () => (
	<DefaultLayout title={"Contact / Socials"}>
		<p>
			<a href='https://github.com/pxseu'>Github</a>
		</p>
		<p>
			<a href='https://twitter.com/pxseu'>Twitter</a>
		</p>
		<p>
			<a href='mailto:me@pxseu.com'>Email</a>
		</p>
		<p>
			<a href='https://discord.pxseu.com'>Discord</a>
		</p>
	</DefaultLayout>
);

export default Contact;
