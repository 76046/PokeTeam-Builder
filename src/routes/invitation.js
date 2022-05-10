import { Router } from "express";
import * as controller from "../controllers/invitation.js";
import auth from "../middleware/auth.js";

const router = Router();

// # == Invitation

router.post("/", auth, controller.postInvitation);
router.get("/:id", auth, controller.getInvitationsById);
router.get("/accept/:id", auth, controller.getAcceptById);
router.get("/reject/:id", auth, controller.getRejectById);
router.delete("/:id", auth, controller.deleteInvitationById);

export default router;
