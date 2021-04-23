import { Document, model, Schema } from "mongoose";

interface RateLimitObject {
	amount: number;
	reset: number;
}

export interface ApiUser extends Document {
	auth_key: string;
	name: string;
	messageCount: number;
	rate_limit: {
		sendMessage: RateLimitObject;
		[key: string]: RateLimitObject;
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
			amount: {
				type: Number,
				required: true,
				default: 10,
			},
			reset: {
				type: Number,
				required: true,
				default: 10,
			},
		},
	},
});

export default model<ApiUser>("auth_key_api", serverSchema);
