import { getCssText, globalStyles } from "@/../stitches.config";

// maybe this will not break the build. who knows!
export default async function StyleSheet() {
	// DONT KNOW IF IM COPING BUT I AM
	await new Promise((resolve) => setTimeout(resolve, 2_000));

	globalStyles();

	return <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />;
}
