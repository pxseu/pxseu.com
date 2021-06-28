import sharp from "sharp";

export const colorToBaseImage = async (color: string) => {
	const background = color ?? "#ffffff";

	const image = await sharp({
		create: {
			width: 1,
			height: 1,
			channels: 4,
			background,
		},
	})
		.png()
		.toBuffer();
	return `data:image/png;base64,${image.toString("base64")}`;
};
