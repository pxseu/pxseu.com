import { Router } from "express";
import { methodCheck } from "../methodCheck";
import { bajoJajo } from "./bajoJajo";
import { isValidMessage, sendMessage } from "./sendMessage";
import spotify from "./spotify";

const router = Router();

router.use("/sendMessage", methodCheck.post, isValidMessage, sendMessage);
router.use("/bajoJajo", methodCheck.get, bajoJajo);
router.use("/spotify", spotify);

export default router;
