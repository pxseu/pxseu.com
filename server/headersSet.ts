import { Router } from "express";

const router = Router();

router.use((_, res, next) => {
	res.set("X-CUM", "sticky");
	res.set("X-pxseu", "cute");
	res.set("X-Peitho", "love <3");
	res.set("X-JelNiSlaw", "menel");
	next();
});

router.use((req, res, next) => {
	if (req.method == "GET") {
		res.set("Cache-control", `public, max-age=${7 * 24 * 60 * 60}`);
	} else {
		res.set("Cache-control", `no-store`);
	}

	next();
});

export default router;
