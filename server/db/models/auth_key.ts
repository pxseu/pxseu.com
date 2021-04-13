import { Document, model, Schema } from "mongoose";

export interface ApiUser extends Document {
	auth_key: string;
	name: string;
	messageCount: number;
	rate_limit: {
		sendMessage: number;
	};
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
	rate_limit: {
		sendMessage: {
			type: Number,
		},
	},
});

export default model<ApiUser>("auth_key_api", serverSchema);
