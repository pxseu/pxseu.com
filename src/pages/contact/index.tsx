import DefaultLayout from "../../components/DefaultLayout";
import Twemoji from "../../components/Twemoji";

const Contact = () => (
	<DefaultLayout title={"Contact / Socials"}>
		<p>Bellow are a couple of ways you can get in touch with me!</p>
		<p>
			<a href="https://github.com/pxseu" target="_blank">
				<Twemoji emoji="🌐" /> Github
			</a>
		</p>
		<p>
			<a href="https://twitter.com/pxseu" target="_blank">
				<Twemoji emoji="🐦" /> Twitter
			</a>
		</p>
		<p>
			<a href="mailto:me@pxseu.com" target="_blank">
				<Twemoji emoji="📧" /> Email
			</a>
		</p>
		<p>
			<a href="https://discord.pxseu.com" target="_blank">
				<Twemoji emoji="📱" /> Discord
			</a>
		</p>
	</DefaultLayout>
);

export default Contact;
