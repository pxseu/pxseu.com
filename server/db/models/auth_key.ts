import { Document, model, Schema } from "mongoose";

export interface apiUser extends Document {
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

export default model<apiUser>("auth_key_api", serverSchema);