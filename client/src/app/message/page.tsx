import type { Metadata } from "next";
import Container from "@/components/ui/container";
import JsonLd from "@/components/ui/json-ld";
import MessageForm from "./message-form";

export const metadata: Metadata = {
	title: "Message - pxseu.com",
	description: "Send me a direct message",
	keywords: ["pxseu", "message", "contact"],
};

const contactPageSchema = {
	"@context": "https://schema.org",
	"@type": "ContactPage",
	name: "Message - pxseu.com",
	url: "https://pxseu.com/message",
	description: "Send me a direct message",
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
			<Container
				label="Direct Message"
				title="Send a Message"
				as="main"
				contentClassName="flex justify-center"
			>
				<MessageForm />
			</Container>
		</>
	);
}
