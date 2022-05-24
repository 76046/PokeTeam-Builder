import { Router } from "express";
import * as controller from "../controllers/engine.js";
import authEngine from "../middleware/authEngine.js";

const router = Router();

router.post("/team", authEngine, controller.generateTeam);

export default router;
