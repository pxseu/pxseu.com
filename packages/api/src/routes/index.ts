import { Router } from "express";
import { HOSTNAME } from "../config";
import { router as v2 } from "./v2";

export const router = Router();

router.use("/v2", v2);

router.get("/", (_, res) => {
	res.api(200, {
		message: "Welcome to the pxseu api!",
	});
});

router.get("/health", (_, res) => {
	res.api(200, {
		message: "OK",
		hostname: HOSTNAME,
		env: process.env.NODE_ENV,
		uptime: Math.floor(process.uptime() * 1000),
	});
});

router.use((_, res) => {
	res.api(404, {
		message: "Not Found",
	});
});
