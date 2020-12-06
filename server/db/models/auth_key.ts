import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export type apiUser = Document & {
	auth_key: string;
	user: string;
};

const serverSchema = new Schema({
	auth_key: {
		type: String,
	},
	user: {
		type: String,
	},
});

export default mongoose.model("auth_key_api", serverSchema);
