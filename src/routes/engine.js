import { Router } from "express";
import * as controller from "../controllers/engine.js";
import auth from "../middleware/auth.js";

const router = Router();

// # == User

router.get("/processing", controller.getProcessing);
router.post("/team", auth, controller.generateTeam);

export default router;
