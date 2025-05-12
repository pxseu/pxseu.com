import type { Metadata } from "next";
import MessageForm from "@/components/MessageForm";

export const metadata: Metadata = {
	title: "pxseu.com",
	description: "Send me a message",
	keywords: ["pxseu", "message", "contact"],
};

export default function MessagePage() {
	return (
		<div className="flex flex-col items-center w-full px-4 py-8">
			<MessageForm />
		</div>
	);
}
