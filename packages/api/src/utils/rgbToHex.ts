interface IrgbToHex {
	r: number;
	g: number;
	b: number;
}

export const rgbToHex = ({ r, g, b }: IrgbToHex) =>
	`#${[r, g, b]
		.map((n) => {
			const hex = n.toString(16);

			return hex.length === 1 ? `0${hex}` : hex;
		})
		.join("")}`;
