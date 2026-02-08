import type { Metadata } from "next";
import {
	FaDiscord,
	FaDocker,
	FaEnvelope,
	FaGithub,
	FaGitlab,
	FaLinkedin,
	FaNpm,
	FaPatreon,
	FaRust,
	FaSpotify,
	FaTiktok,
	FaTwitch,
	FaTwitter,
	FaYoutube,
} from "react-icons/fa";
import JsonLd from "@/components/json-ld";
import LinkItem from "@/components/link";

export const metadata: Metadata = {
	description: "A collection of my links",
};

const collectionPageSchema = {
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	name: "Links - pxseu.com",
	url: "https://pxseu.com/links",
	description: "A collection of my links",
	mainEntity: {
		"@type": "Person",
		name: "pxseu",
		url: "https://pxseu.com",
	},
};

const collectionPageSchemaJson = JSON.stringify(collectionPageSchema);

export default function Links() {
	return (
		<>
			<JsonLd id="collection-page-schema" json={collectionPageSchemaJson} />
			<div className="mx-auto w-full max-w-2xl border border-border-100 bg-zinc-950/50">
				<div className="space-y-4 border-b border-border-100 px-5 py-5 sm:px-6">
					<h2 className="text-xl font-semibold uppercase tracking-widest text-zinc-200 sm:text-2xl">
						Support Me!
					</h2>
					<div className="space-y-3">
						<LinkItem
							icon={<FaPatreon />}
							displayName="Patreon"
							link="https://patreon.com/pxseu"
							color="text-pink-400"
						/>
						<LinkItem
							icon={<FaGithub />}
							displayName="GitHub Sponsors"
							link="https://github.com/sponsors/pxseu"
							color="text-red-400"
						/>
					</div>
				</div>

				<div className="space-y-4 border-b border-border-100 px-5 py-5 sm:px-6">
					<h2 className="text-xl font-semibold uppercase tracking-widest text-zinc-200 sm:text-2xl">
						Business & Work
					</h2>
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
							color="text-indigo-400"
						/>
						<LinkItem
							icon={<FaLinkedin />}
							displayName="LinkedIn"
							link="https://www.linkedin.com/in/kubaellwart/"
							color="text-blue-400"
						/>
					</div>
				</div>

				<div className="space-y-4 border-b border-border-100 px-5 py-5 sm:px-6">
					<h2 className="text-xl font-semibold uppercase tracking-widest text-zinc-200 sm:text-2xl">
						Social Media
					</h2>
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
							color="text-sky-400"
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

				<div className="space-y-4 px-5 py-5 sm:px-6">
					<h2 className="text-xl font-semibold uppercase tracking-widest text-zinc-200 sm:text-2xl">
						OSS / Community
					</h2>
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
		</>
	);
}
