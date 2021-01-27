import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export type apiUser = Document & {
	auth_key: string;
	user: string;
};

const serverSchema = new Schema({
	auth_key: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
});

export default mongoose.model("auth_key_api", serverSchema);
