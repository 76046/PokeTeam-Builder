import { Router } from "express";
import * as controller from "../controllers/invitation.js";
import auth from "../middleware/auth.js";

const router = Router();

// # == Invitation

router.post("/", controller.postInvitation);
router.get("/invitations", controller.getInvitationsById);
router.get("/accept/:id", auth, controller.getAcceptById);
router.delete("/:id", controller.deleteInvitationById);

export default router;
