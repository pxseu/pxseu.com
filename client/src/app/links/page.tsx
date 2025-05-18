import LinkItem from "@/components/link";
import type { Metadata } from "next";
import {
	FaRust,
	FaDiscord,
	FaEnvelope,
	FaGithub,
	FaLinkedin,
	FaSpotify,
	FaTiktok,
	FaTwitch,
	FaTwitter,
	FaYoutube,
	FaNpm,
	FaDocker,
	FaGitlab,
} from "react-icons/fa";

export const metadata: Metadata = {
	description: "A collection of my links",
};

export default function Links() {
	return (
		<div className="mx-auto px-4 py-8 space-y-10 text-center max-w-lg w-full">
			<div className="space-y-5">
				<h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Business & Work</h2>
				<div className="space-y-3">
					<LinkItem
						icon={<FaEnvelope />}
						displayName="Email"
						link="mailto:kuba@pxseu.com"
						color="text-green-400"
					/>
					<LinkItem
						icon={<FaGithub />}
						displayName="GitHub"
						link="https://github.com/pxseu"
						color="text-gray-400"
					/>
					<LinkItem
						icon={<FaDiscord />}
						displayName="Discord"
						link="https://discord.com/users/338718840873811979"
						color="text-blue-400"
					/>
					<LinkItem
						icon={<FaLinkedin />}
						displayName="LinkedIn"
						link="https://www.linkedin.com/in/kubaellwart/"
						color="text-blue-400"
					/>
				</div>
			</div>

			<div className="space-y-5">
				<h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Social Media</h2>
				<div className="space-y-3">
					<LinkItem
						icon={<FaTiktok />}
						displayName="TikTok"
						link="https://tiktok.com/@pxseu"
						color="text-pink-400"
					/>
					<LinkItem
						icon={<FaTwitch />}
						displayName="Twitch"
						link="https://twitch.tv/pxseu"
						color="text-purple-400"
					/>
					<LinkItem
						icon={<FaTwitter />}
						displayName="Twitter"
						link="https://twitter.com/pxseu"
						color="text-blue-400"
					/>

					<LinkItem
						icon={<FaSpotify />}
						displayName="Spotify"
						link="https://open.spotify.com/user/1evum6fq9klvekqjbz4cu5v79"
						color="text-green-400"
					/>
					<LinkItem
						icon={<FaYoutube />}
						displayName="YouTube"
						link="https://www.youtube.com/channel/UC5_T1P4TJ4lJUt3XaM3Y_8Q"
						color="text-red-400"
					/>
				</div>
			</div>

			<div className="space-y-5">
				<h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">OSS / Community</h2>
				<div className="space-y-3">
					<LinkItem
						icon={<FaNpm />}
						displayName="npm"
						link="https://www.npmjs.com/~pxseu"
						color="text-red-400"
					/>
					<LinkItem
						icon={<FaGitlab />}
						displayName="GitLab"
						link="https://gitlab.com/pxseu"
						color="text-orange-400"
					/>
					<LinkItem
						icon={<FaRust />}
						displayName="crates.io"
						link="https://crates.io/users/pxseu"
						color="text-orange-400"
					/>
					<LinkItem
						icon={<FaDocker />}
						displayName="Docker Hub"
						link="https://hub.docker.com/u/pxseu"
						color="text-blue-400"
					/>
				</div>
			</div>
		</div>
	);
}
