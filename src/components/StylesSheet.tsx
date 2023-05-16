import { getCssText, globalStyles } from "@/../stitches.config";

// maybe this will not break the build. who knows!
export default async function StyleSheet() {
	// i know this is bad, but i don't know how to fix it :(
	if (typeof window === "undefined") await new Promise((resolve) => setTimeout(resolve, 2_000));

	globalStyles();

	return <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />;
}
