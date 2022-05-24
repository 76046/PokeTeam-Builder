import { Router } from "express";
import * as controller from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/invitations", auth, controller.getUserInvitations);
router.get("/avatar", auth, controller.getAvatar);
router.get("/avatar/:id", auth, controller.getAvatarById);
router.get("/:id", auth, controller.getUserById);

router.post("/invite", auth, controller.postUserInvite);
router.post("/avatar", auth, controller.postAvatar);

router.post("/login", controller.postUserLogin);
router.post("/", controller.postUser);

router.patch("/", auth, controller.patchUser);
router.delete("/:id", auth, controller.deleteUserById); // Admin

export default router;
