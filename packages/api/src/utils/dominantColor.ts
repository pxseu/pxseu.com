import sharp from "sharp";
import fetch from "node-fetch";
import { rgbToHex } from "./rgbToHex";

export const dominantColor = async (imageUrl: string): Promise<string | undefined> => {
	if (!imageUrl) return;

	// fetch the image
	const response = await fetch(imageUrl);
	const buffer = await response.buffer();

	// get the dominant color
	const { dominant } = await sharp(buffer).resize({ position: sharp.strategy.attention }).stats();

	return rgbToHex(dominant);
};
