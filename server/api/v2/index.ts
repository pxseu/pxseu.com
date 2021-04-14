import { Router } from "express";
import { bajoJajo } from "./bajoJajo";
import { router as sendMessageRouter } from "./sendMessage";
import { router as spotifyRouter } from "./spotify";

const router = Router();

router.use(["/sendMessage", "send_message"], sendMessageRouter);
router.use(["/bajoJajo", "bajo_jajo"], bajoJajo);
router.use("/spotify", spotifyRouter);

export default router;
