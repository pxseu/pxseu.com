import { Document, model, Schema } from "mongoose";

export interface apiUser extends Document {
	auth_key: string;
	name: string;
	messageCount: number;
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
	messageCount: {
		type: Number,
		required: true,
		default: 0,
	},
});

export default model<apiUser>("auth_key_api", serverSchema);
