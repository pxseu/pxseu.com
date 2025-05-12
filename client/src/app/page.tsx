import Main from "@/components/main";
import type { Metadata } from "next";

export const metadata: Metadata = {
	description: "Find out more about me",
};

// export const revalidate = 7200; // 2 hours

export default async function Home() {
	return <Main content={[]} />;
}
