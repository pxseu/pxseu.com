import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ALLOW_SEND_MESSAGE } from "../../../config";

const schema = yup.object().shape({
	message: yup
		.string()
		.test("length", "The message cannot be longer than 2000", (value) => {
			if (!value) return true;

			return value.length <= 2000;
		})
		.nullable(),
	name: yup
		.string()
		.test("length", "The name cannot be longer than 128 characters", (value) => {
			if (!value) return true;

			return value.length <= 128;
		})
		.nullable(),
	attachment: yup
		.string()
		.url()
		.test("length", "The attachment cannot be longer than 200 characters", (value) => {
			if (!value) return true;

			return value.length <= 200;
		})
		.nullable(),
});

export const validateMessage = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
	if (!ALLOW_SEND_MESSAGE)
		return res.api(503, {
			message: "Service disabled.",
		});

	try {
		await schema.validate(req.body);
	} catch (error) {
		if (error instanceof yup.ValidationError)
			return res.api(400, {
				message: error.errors.join(", "),
			});

		return res.api(500, {
			message: "Something broke idk",
		});
	}

	// nullify shit
	if (!req.body.name) req.body.name = null;
	if (!req.body.message) req.body.message = null;
	if (!req.body.attachment) req.body.attachment = null;

	if (req.body.attachment === null && req.body.message === null)
		return res.api(400, { message: "You must provide a message or an attachment" });

	// if (DEV_MODE) return next();

	next();
};
