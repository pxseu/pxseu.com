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
import Container from "@/components/ui/container";
import JsonLd from "@/components/ui/json-ld";
import LinkItem from "./link-item";

export const metadata: Metadata = {
	title: "Links - pxseu.com",
	description: "Find me around the web",
};

const collectionPageSchema = {
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	name: "Links - pxseu.com",
	url: "https://pxseu.com/links",
	description: "Find me around the web",
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
			<Container
				title="Links"
				label="Directory"
				as="main"
				contentClassName="p-0"
			>
				<div className="space-y-4 border-b border-border-100 px-5 py-5 sm:px-6">
					<h3 className="text-xl font-semibold uppercase tracking-widest text-zinc-200 sm:text-2xl">
						Support
					</h3>
					<div className="space-y-3">
						<LinkItem
							icon={<FaPatreon />}
							displayName="Patreon"
							link="https://patreon.com/pxseu"
							colorClass="text-pink-400"
						/>
						<LinkItem
							icon={<FaGithub />}
							displayName="GitHub Sponsors"
							link="https://github.com/sponsors/pxseu"
							colorClass="text-red-400"
						/>
					</div>
				</div>

				<div className="space-y-4 border-b border-border-100 px-5 py-5 sm:px-6">
					<h3 className="text-xl font-semibold uppercase tracking-widest text-zinc-200 sm:text-2xl">
						Work
					</h3>
					<div className="space-y-3">
						<LinkItem
							icon={<FaEnvelope />}
							displayName="Email"
							link="mailto:kuba@pxseu.com"
							colorClass="text-green-400"
						/>
						<LinkItem
							icon={<FaGithub />}
							displayName="GitHub"
							link="https://github.com/pxseu"
							colorClass="text-gray-400"
						/>
						<LinkItem
							icon={<FaDiscord />}
							displayName="Discord"
							link="https://discord.com/users/338718840873811979"
							colorClass="text-indigo-400"
						/>
						<LinkItem
							icon={<FaLinkedin />}
							displayName="LinkedIn"
							link="https://www.linkedin.com/in/kubaellwart/"
							colorClass="text-blue-400"
						/>
					</div>
				</div>

				<div className="space-y-4 border-b border-border-100 px-5 py-5 sm:px-6">
					<h3 className="text-xl font-semibold uppercase tracking-widest text-zinc-200 sm:text-2xl">
						Social Media
					</h3>
					<div className="space-y-3">
						<LinkItem
							icon={<FaTiktok />}
							displayName="TikTok"
							link="https://tiktok.com/@pxseu"
							colorClass="text-pink-400"
						/>
						<LinkItem
							icon={<FaTwitch />}
							displayName="Twitch"
							link="https://twitch.tv/pxseu"
							colorClass="text-purple-400"
						/>
						<LinkItem
							icon={<FaTwitter />}
							displayName="Twitter"
							link="https://twitter.com/pxseu"
							colorClass="text-sky-400"
						/>

						<LinkItem
							icon={<FaSpotify />}
							displayName="Spotify"
							link="https://open.spotify.com/user/1evum6fq9klvekqjbz4cu5v79"
							colorClass="text-green-400"
						/>
						<LinkItem
							icon={<FaYoutube />}
							displayName="YouTube"
							link="https://www.youtube.com/channel/UC5_T1P4TJ4lJUt3XaM3Y_8Q"
							colorClass="text-red-400"
						/>
					</div>
				</div>

				<div className="space-y-4 px-5 py-5 sm:px-6">
					<h3 className="text-xl font-semibold uppercase tracking-widest text-zinc-200 sm:text-2xl">
						Open Source / Community
					</h3>
					<div className="space-y-3">
						<LinkItem
							icon={<FaNpm />}
							displayName="npm"
							link="https://www.npmjs.com/~pxseu"
							colorClass="text-red-400"
						/>
						<LinkItem
							icon={<FaGitlab />}
							displayName="GitLab"
							link="https://gitlab.com/pxseu"
							colorClass="text-orange-400"
						/>
						<LinkItem
							icon={<FaRust />}
							displayName="crates.io"
							link="https://crates.io/users/pxseu"
							colorClass="text-orange-400"
						/>
						<LinkItem
							icon={<FaDocker />}
							displayName="Docker Hub"
							link="https://hub.docker.com/u/pxseu"
							colorClass="text-blue-400"
						/>
					</div>
				</div>
			</Container>
		</>
	);
}
