import { Router } from "express";
import * as controller from "../controllers/move.js";
import auth from "../middleware/auth.js";

const router = Router();

// # == Move

router.post("/", auth, controller.postMove);
router.get("/moves", controller.getMoves);
router.get("/:id", controller.getMoveById);
router.patch("/:id", auth, controller.patchMoveById); // Admin
router.delete("/:id", auth, controller.deleteMoveById); // Admin

export default router;
