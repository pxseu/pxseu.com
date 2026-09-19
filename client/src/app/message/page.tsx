import { MessageForm } from "@/components/message/message-form";
import { definePage } from "@/utils/define-page";
import { PERSON_ID } from "@/utils/page-metadata";

const page = definePage({
	path: "/message",
	title: "Message",
	description: "Send me a message!",
	keywords: ["pxseu", "message", "contact"],
	discord: {
		content: "Leave me a message.",
		links: [{ label: "Send a message", url: "/message" }],
	},
	jsonLd: {
		"@type": "ContactPage",
		mainEntity: { "@id": PERSON_ID },
	},
});

export const generateMetadata = page.generateMetadata;

export default page.wrap(function MessagePage() {
	return (
		<article className="flex max-w-2xl flex-col gap-6" data-stagger>
			<section className="flex flex-col gap-2" data-stagger>
				<h1 className="text-lg font-semibold text-zinc-100">Send a message</h1>
				<p>You can leave your name or stay anonymous. A message or attachment is enough.</p>
			</section>
			<MessageForm />
		</article>
	);
});
