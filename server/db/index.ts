import mongoose from "mongoose";

mongoose.connection.on("error", (error) => {
	console.log(error);
	process.exit(1);
});
mongoose.connection.once("open", () =>
	console.log(`> Connected to database: ${mongoose.connection.name}`),
);

export const connect = async () => {
	await mongoose.connect(process.env.MONGODB_URI ?? "", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
};
