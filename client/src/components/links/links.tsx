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
import { LinkGroup, type LinkGroupProps } from "./link-group";

export const LINK_GROUPS = [
	{
		title: "Code",
		links: [
			{
				displayName: "npm",
				href: "https://www.npmjs.com/~pxseu",
				icon: FaNpm,
				colorClass: "group-hover:text-red-400",
			},
			{
				displayName: "GitLab",
				href: "https://gitlab.com/pxseu",
				icon: FaGitlab,
				colorClass: "group-hover:text-orange-400",
			},
			{
				displayName: "crates.io",
				href: "https://crates.io/users/pxseu",
				icon: FaRust,
				colorClass: "group-hover:text-orange-400",
			},
			{
				displayName: "Docker Hub",
				href: "https://hub.docker.com/u/pxseu",
				icon: FaDocker,
				colorClass: "group-hover:text-blue-400",
			},
		],
	},
	{
		title: "Work & contact",
		links: [
			{
				displayName: "Email",
				href: "mailto:kuba@pxseu.com",
				icon: FaEnvelope,
				colorClass: "group-hover:text-green-400",
			},
			{
				displayName: "GitHub",
				href: "https://github.com/pxseu",
				icon: FaGithub,
				colorClass: "group-hover:text-zinc-300",
			},
			{
				displayName: "Discord",
				href: "https://discord.com/users/338718840873811979",
				icon: FaDiscord,
				colorClass: "group-hover:text-indigo-400",
			},
			{
				displayName: "LinkedIn",
				href: "https://www.linkedin.com/in/kubaellwart/",
				icon: FaLinkedin,
				colorClass: "group-hover:text-blue-400",
			},
		],
	},
	{
		title: "Social",
		links: [
			{
				displayName: "TikTok",
				href: "https://tiktok.com/@pxseu",
				icon: FaTiktok,
				colorClass: "group-hover:text-pink-400",
			},
			{
				displayName: "Twitch",
				href: "https://twitch.tv/pxseu",
				icon: FaTwitch,
				colorClass: "group-hover:text-purple-400",
			},
			{
				displayName: "Twitter",
				href: "https://twitter.com/pxseu",
				icon: FaTwitter,
				colorClass: "group-hover:text-sky-400",
			},
			{
				displayName: "Spotify",
				href: "https://open.spotify.com/user/1evum6fq9klvekqjbz4cu5v79",
				icon: FaSpotify,
				colorClass: "group-hover:text-green-400",
			},
			{
				displayName: "YouTube",
				href: "https://www.youtube.com/channel/UC5_T1P4TJ4lJUt3XaM3Y_8Q",
				icon: FaYoutube,
				colorClass: "group-hover:text-red-400",
			},
		],
	},
	{
		title: "Support",
		links: [
			{
				displayName: "Patreon",
				href: "https://patreon.com/pxseu",
				icon: FaPatreon,
				colorClass: "group-hover:text-pink-400",
			},
			{
				displayName: "GitHub Sponsors",
				href: "https://github.com/sponsors/pxseu",
				icon: FaGithub,
				colorClass: "group-hover:text-red-400",
			},
		],
	},
] satisfies LinkGroupProps[];

export function Links() {
	return (
		<div className="grid gap-x-10 gap-y-8 sm:grid-cols-2" data-stagger>
			{LINK_GROUPS.map((group) => (
				<LinkGroup key={group.title} {...group} />
			))}
		</div>
	);
}
