import { Router } from "express";
import { stats } from "./stats";
import { genres } from "./genres";
import { favourites } from "./favourites";

export const router = Router();

router.use("/stats", stats);
router.use(["/topGenres", "/top_genres"], genres);
router.use("/favourites", favourites);
