import { Router } from "express";
import { bajoJajo } from "./bajoJajo";
import { router as sendMessageRouter } from "./sendMessage";
import { router as spotifyRouter } from "./spotify";
import { router as anilistRouter } from "./anilist";

export const router = Router();

router.use(["/sendMessage", "send_message"], sendMessageRouter);
router.use(["/bajoJajo", "bajo_jajo"], bajoJajo);
router.use("/spotify", spotifyRouter);
router.use("/anilist", anilistRouter);
