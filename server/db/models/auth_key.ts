import { Document, model, Schema } from "mongoose";

export interface apiUser extends Document {
	auth_key: string;
	name: string;
}

const serverSchema = new Schema({
	auth_key: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

export default model<apiUser>("auth_key_api", serverSchema);
