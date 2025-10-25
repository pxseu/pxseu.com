import type { Metadata } from "next";
import Main from "@/components/main";

export const metadata: Metadata = {
	description: "Find out more about me",
};

// export const revalidate = 7200; // 2 hours

export default async function Home() {
	return <Main />;
}
