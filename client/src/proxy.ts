import { type NextRequest, NextResponse } from "next/server";

const TERMINAL_UA = /\b(curl|wget|httpie|libcurl)\b/i;

const reset = "\x1b[0m";
const bold = "\x1b[1m";
const dim = "\x1b[2m";
const brand = "\x1b[38;2;136;102;255m";
const underline = "\x1b[4m";

const arrow = `${brand}→${reset}`;

const BRAND_STOPS: [number, number, number][] = [
	[0x00, 0xcc, 0xff], // brand-100
	[0x88, 0x66, 0xff], // brand-500
	[0xff, 0x00, 0xee], // brand-900
];

const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

const gradient = (text: string, stops = BRAND_STOPS, underlined = true) => {
	const chars = [...text];
	const last = chars.length - 1 || 1;
	const body = chars
		.map((ch, i) => {
			const pos = (i / last) * (stops.length - 1);
			const idx = Math.min(Math.floor(pos), stops.length - 2);
			const t = pos - idx;
			const [r1, g1, b1] = stops[idx];
			const [r2, g2, b2] = stops[idx + 1];
			return `\x1b[38;2;${lerp(r1, r2, t)};${lerp(g1, g2, t)};${lerp(b1, b2, t)}m${ch}`;
		})
		.join("");
	return `${underlined ? underline : ""}${body}${reset}`;
};

const CARD = `
  ${bold}${gradient("pxseu", BRAND_STOPS, false)} ${dim}— Kuba${reset}

  ${dim}backend services, internal tooling, and
  small interfaces that don't feel disposable.${reset}

  ${arrow} email    ${underline}mailto:kuba@pxseu.com${reset}
  ${arrow} github   ${underline}https://github.com/pxseu${reset}
  ${arrow} twitter  ${underline}https://twitter.com/pxseu${reset}
  ${arrow} discord  ${underline}https://discord.com/users/338718840873811979${reset}

  ${dim}you curl'd. the prettier version lives at${reset}
  ${gradient("https://pxseu.com")} ${brand}♥${reset}

`;

export function proxy(req: NextRequest) {
	const ua = req.headers.get("user-agent") ?? "";

	if (TERMINAL_UA.test(ua)) {
		return new NextResponse(CARD, {
			status: 200,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"Cache-Control": "no-store",
				Vary: "User-Agent",
			},
		});
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/",
};
