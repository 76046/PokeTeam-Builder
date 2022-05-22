import { Router } from "express";
import * as controller from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/invitations", auth, controller.getUserInvitations);
//router.get("/friends", auth, controller.getUserFriends);
//router.get("/start", auth, controller.getUserStart);
//router.get("/summaries", auth, controller.getUserSummaries);
router.get("/:id", auth, controller.getUserById);

router.post("/invite", auth, controller.postUserInvite);
router.post("/login", controller.postUserLogin);
router.post("/", controller.postUser);

router.patch("/", auth, controller.patchUser);
router.delete("/:id", auth, controller.deleteUserById); // Admin

export default router;
