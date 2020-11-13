import mongoose from "mongoose";
const Schema = mongoose.Schema;

const serverSchema = new Schema({
	auth_key: {
		type: String,
	},
	user: {
		type: String,
	},
});

export default mongoose.model("auth_key_api", serverSchema);
