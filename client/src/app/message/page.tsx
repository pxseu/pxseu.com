import type { Metadata } from "next";
import Container from "@/components/ui/container";
import JsonLd from "@/components/ui/json-ld";
import MessageForm from "./message-form";

export const metadata: Metadata = {
	title: "Message - pxseu.com",
	description: "Send Kuba a message directly through pxseu.com.",
	keywords: ["pxseu", "message", "contact"],
};

const contactPageSchema = {
	"@context": "https://schema.org",
	"@type": "ContactPage",
	name: "Message - pxseu.com",
	url: "https://pxseu.com/message",
	description: "Send Kuba a message directly through pxseu.com.",
	mainEntity: {
		"@type": "Person",
		name: "pxseu",
		url: "https://pxseu.com",
		email: "kuba@pxseu.com",
	},
};

const contactPageSchemaJson = JSON.stringify(contactPageSchema);

export default function MessagePage() {
	return (
		<>
			<JsonLd id="contact-page-schema" json={contactPageSchemaJson} />
			<Container title="Send a message" as="main">
				<p className="mb-5 text-sm leading-relaxed text-zinc-400">
					You can leave your name or stay anonymous. A message or attachment is enough.
				</p>
				<MessageForm />
			</Container>
		</>
	);
}
