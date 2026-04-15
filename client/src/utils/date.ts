const date = new Intl.DateTimeFormat("en-GB", {
	year: "numeric",
	month: "long",
	day: "numeric",
});

export function formatDate(d: Date): string {
	return date.format(d);
}
