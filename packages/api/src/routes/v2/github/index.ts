import { Router } from "express";
import { pinnedRepos } from "./pinnedRepos";

export const router = Router();

router.get(["/pinnedRepos", "/pinned_repos"], pinnedRepos);
