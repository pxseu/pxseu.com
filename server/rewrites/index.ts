import { Router } from "express";
const rewrites = require("../../rewrites.json");

const router = Router();

rewrites.forEach((rewrite: { req: string; res: string }) => {
	router.get(rewrite.req, (_, res) => {
		res.redirect(rewrite.res);
	});
});

export default router;
