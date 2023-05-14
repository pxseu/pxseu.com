import { InitOptions } from "i18next";

export const fallbackLang = "en";
export const languages = [fallbackLang, "pl"] as const;
export const defaultNS = "translation";

export function getOptions(lang = fallbackLang, ns = defaultNS): InitOptions<unknown> {
	return {
		supportedLngs: languages,
		fallbackLng: fallbackLang,
		lng: lang,
		fallbackNS: defaultNS,
		defaultNS,
		ns,
	};
}
