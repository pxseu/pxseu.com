const date = new Intl.DateTimeFormat("en-GB", {
	year: "numeric",
	month: "long",
	day: "numeric",
});

export const formatDate: (d: Date) => string = date.format;
