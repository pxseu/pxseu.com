import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLang, languages } from "./app/i18n/settings";

acceptLanguage.languages(languages as unknown as string[]);

export const config = {
	// matcher: '/:lang*'
	matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18n";

export function middleware(req: NextRequest) {
	let lang;
	if (req.cookies.has(cookieName)) lang = acceptLanguage.get(req.cookies.get(cookieName)?.value);
	if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
	if (!lang) lang = fallbackLang;

	// Redirect if lang in path is not supported
	if (
		!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
		!req.nextUrl.pathname.startsWith("/_next")
	) {
		return NextResponse.redirect(new URL(`/${lang}${req.nextUrl.pathname}`, req.url));
	}

	if (req.headers.has("referer")) {
		const refererUrl = new URL(req.headers.get("referer")!);
		const langInReferer = languages.find((ln) => refererUrl.pathname.startsWith(`/${ln}`));
		const response = NextResponse.next();

		if (langInReferer) response.cookies.set(cookieName, langInReferer);

		return response;
	}

	return NextResponse.next();
}
