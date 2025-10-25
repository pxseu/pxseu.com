import sharp from "sharp";

export const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) =>
	`#${[r, g, b]
		.map((n) => {
			const hex = n.toString(16);

			return hex.length === 1 ? `0${hex}` : hex;
		})
		.join("")}`;

export const dominantColor = async (
	imageUrl: string,
): Promise<string | undefined> => {
	if (!imageUrl) return;

	// fetch the image
	const response = await fetch(imageUrl);
	const buffer = await response.arrayBuffer();

	// get the dominant color
	const { dominant } = await sharp(buffer)
		.resize({ position: sharp.strategy.attention })
		.stats();

	return rgbToHex(dominant);
};
