import * as yup from "yup";

export const Capitalize = (value?: string) => {
	if (typeof value !== "string") return "";
	return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.test("length", "The name cannot be longer than 128 characters", (value) => {
			if (!value) return true;

			return value.length <= 128;
		})
		.nullable(),
	content: yup
		.string()
		.test("length", "The message cannot be longer than 2000", (value) => {
			if (!value) return true;

			return value.length <= 2000;
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
