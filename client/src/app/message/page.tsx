import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { MessageForm } from "@/components/message/message-form";

const description = "Send me a message!";

export const metadata: Metadata = {
	title: "Message - pxseu.com",
	description,
	keywords: ["pxseu", "message", "contact"],
};

const contactPageSchema = {
	"@context": "https://schema.org",
	"@type": "ContactPage",
	name: "Message - pxseu.com",
	url: "https://pxseu.com/message",
	description,
	mainEntity: {
		"@type": "Person",
		name: "pxseu",
		url: "https://pxseu.com",
		email: "kuba@pxseu.com",
	},
};

export default function MessagePage() {
	return (
		<article className="flex max-w-2xl flex-col gap-6" data-stagger>
			<JsonLd id="contact-page-schema" json={contactPageSchema} />

			<section className="flex flex-col gap-2" data-stagger>
				<h1 className="text-lg font-semibold text-zinc-100">Send a message</h1>
				<p>You can leave your name or stay anonymous. A message or attachment is enough.</p>
			</section>
			<MessageForm />
		</article>
	);
}
