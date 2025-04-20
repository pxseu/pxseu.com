import LinkItem from "@/components/link";
import type { Metadata } from "next";
import { FaTwitter } from "react-icons/fa";

export const metadata: Metadata = {
	title: "pxseu.com",
	description: "Find out more about me",
};

export default function Links() {
	return (
		<div className="space-y-4">
			<LinkItem icon={<FaTwitter />} displayName="Twitter" link="https://twitter.com/pxseu" />
			<LinkItem
				icon={<FaTwitter />}
				displayName="Twitter (Red)"
				link="https://twitter.com/pxseu"
				color="text-red-400"
			/>
		</div>
	);
}
