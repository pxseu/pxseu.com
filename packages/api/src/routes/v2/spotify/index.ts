import { Router } from "express";
import { nowPlaying } from "./nowPlaying";
import { topTracks } from "./topSongs";

export const router = Router();

router.get(["/nowPlaying", "/now_playing"], nowPlaying);
router.get(["/topSongs", "/top_songs"], topTracks);
