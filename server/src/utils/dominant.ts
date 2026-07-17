import { fetch } from "clients/fetch.js";
import sharp from "sharp";

const saturation = (r: number, g: number, b: number) => {
	const max = Math.max(r, g, b);

	return max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
};

const rgbToHsl = (r: number, g: number, b: number) => {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	const d = max - min;

	let h = 0;
	let s = 0;

	if (d !== 0) {
		s = d / (1 - Math.abs(2 * l - 1));

		switch (max) {
			case r:
				h = ((g - b) / d) % 6;
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			default:
				h = (r - g) / d + 4;
				break;
		}

		h *= 60;
		if (h < 0) h += 360;
	}

	return {
		h: Math.round(h),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
};

export const dominantColor = async (imageUrl: string): Promise<string | undefined> => {
	if (!imageUrl) return;

	const response = await fetch(imageUrl);
	const buffer = await response.arrayBuffer();

	const { data, info } = await sharp(buffer)
		.resize(80, 80, { fit: "inside" })
		.removeAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });

	const buckets = new Map<number, { r: number; g: number; b: number; count: number }>();

	for (let i = 0; i < data.length; i += info.channels) {
		const r = data[i] ?? 0;
		const g = data[i + 1] ?? 0;
		const b = data[i + 2] ?? 0;

		const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3); // 5 bits/channel
		const bucket = buckets.get(key);

		if (bucket) {
			bucket.r += r;
			bucket.g += g;
			bucket.b += b;
			bucket.count++;
		} else {
			buckets.set(key, { r, g, b, count: 1 });
		}
	}

	let best: { r: number; g: number; b: number } = { r: 0, g: 0, b: 0 };
	let bestScore = -1;

	for (const { r, g, b, count } of buckets.values()) {
		const ar = r / count;
		const ag = g / count;
		const ab = b / count;

		const sat = saturation(ar, ag, ab);
		const lum = (0.299 * ar + 0.587 * ag + 0.114 * ab) / 255;

		// reward vibrancy + decent coverage, but zero out near-black/near-white
		const score = sat * Math.sqrt(count) * Math.max(0, 1 - Math.abs(lum - 0.5) * 2);

		if (score > bestScore) {
			bestScore = score;
			best = { r: ar, g: ag, b: ab };
		}
	}

	const { h, s, l } = rgbToHsl(best.r, best.g, best.b);

	return `hsl(${h}, ${s}%, ${l}%)`;
};
