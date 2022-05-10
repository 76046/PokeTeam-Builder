import { Router } from "express";
import * as controller from "../controllers/team.js";
import auth from "../middleware/auth.js";
const router = Router();

// # == Team

router.post("/", auth, controller.postTeam);
router.get("/teams", auth, controller.getTeams);
router.get("/:id", auth, controller.getTeamById);
router.patch("/:id", auth, controller.patchTeamById);
router.delete("/:id", auth, controller.deleteTeamById);

export default router;
