import { Router } from "express";
// import { router as sendMessageRouter } from "./v2/sendMessage";
// import { router as spotifyRouter } from "./v2/spotify";
import { router as anilistRouter } from "./anilist";

export const router = Router();

// router.use(["/sendMessage", "send_message"], sendMessageRouter);
// router.use("/spotify", spotifyRouter);
router.use("/anilist", anilistRouter);
