import { Router } from "express";
import { bajoJajo } from "./bajoJajo";
import { router as sendMessageRouter } from "./sendMessage";
import { router as spotifyRouter } from "./spotify";

const router = Router();

router.use("/sendMessage", sendMessageRouter);
router.use("/bajoJajo", bajoJajo);
router.use("/spotify", spotifyRouter);

export default router;
