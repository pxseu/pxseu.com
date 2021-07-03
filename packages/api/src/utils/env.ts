import path from "path";
import dotenv from "dotenv";
import { ENV_PATH } from "../config";

const envPath = ENV_PATH ?? path.resolve(process.cwd(), `.env${process.env.NODE_ENV !== "production" ? ".local" : ""}`);

dotenv.config({ path: envPath });
