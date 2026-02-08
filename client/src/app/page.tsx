import type { Metadata } from "next";
import Main from "@/components/main";

export const metadata: Metadata = {
	description: "Find out more about me",
};

export default function Home() {
	return <Main />;
}
