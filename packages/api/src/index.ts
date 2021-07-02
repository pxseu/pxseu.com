import "./utils/env";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { DEV, PORT } from "./config";
import { router } from "./routes";
import { useApiExtender } from "./utils/extenders";
import { parser } from "./utils/jsonparser";

const app = express();

app.set("trust proxy", 1);
app.use(morgan(DEV ? "dev" : "common"));
app.use(helmet());
app.use(cors());
app.use(useApiExtender);
app.use(parser);
app.use(router);

const server = app.listen(PORT, () => {
	console.log("\x1b[36m%s\x1b[0m", `> Ready on http://localhost:${PORT}`, "\x1b[0m");
});

server.on("error", (error: any) => {
	console.error("SERVER:", error?.message);
});
