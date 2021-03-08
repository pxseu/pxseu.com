export const rewrites = [
	{
		req: "/bio",
		res: "/about",
	},
	{
		req: "/msg",
		res: "/other/message",
	},
	{
		req: "/%F0%9F%92%97",
		res: "https://ririxi.dev/",
	},
];

export const blacklist = [
	/* "ririxi" */
];

export const spaces = [
	" ",
	"\u200F",
	"\u200E",
	"\u200D",
	"\u200C",
	"\u200B",
	"\u200A",
	"\u2009",
	"\u2008",
	"\u2007",
	"\u2006",
	"\u2005",
	"\u2004",
	"\u2003",
	"\u2002",
	"\u2001",
	"\u2000",
];
