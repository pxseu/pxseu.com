import { Request, Response } from "express";

export const bajoJajo = (req: Request, res: Response): void => {
	const query = req.query.repeat as string;
	const repeats = query ? parseInt(query) : getRandomInt(1, 2000);
	console.log(repeats > 1);
	if (isNaN(repeats)) {
		res.status(400).json({
			status: 400,
			message: '"repeat" is not a number',
		});
		return;
	}

	if (repeats < 1 || repeats > 1000000) {
		res.status(400).json({
			status: 400,
			message: '"repeat" is too large or too small (should be between 1 and 1,000,000)',
		});
		return;
	}

	const string = "bajo jajo ";
	res.json({
		status: 200,
		message: string.repeat(repeats).trim(),
	});
};

/**
 *
 * @param min Minimalna liczba
 * @param max Maksymalna liczba
 */
function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
