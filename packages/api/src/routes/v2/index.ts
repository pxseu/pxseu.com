import { Router } from "express";
import { router as anilistRouter } from "./anilist";
import { router as messageRouter } from "./message";
import { router as spotifyRouter } from "./spotify";
import { router as githubRouter } from "./github";

export const router = Router();

router.use("/spotify", spotifyRouter);
router.use("/anilist", anilistRouter);
router.use(["/sendMessage", "send_message", "message"], messageRouter);
router.use("/github", githubRouter);
