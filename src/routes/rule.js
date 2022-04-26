import { Router } from "express";
import * as controller from "../controllers/Rule.js";
import auth from "../middleware/auth.js";

const router = Router();

// # == Rule

router.post("/", auth, controller.postRule); // Admin
router.get("/rules", controller.getRules);
router.get("/:id", controller.getRuleById);
router.put("/:id", auth, controller.putRuleById); // Admin
router.delete("/:id", auth, controller.deleteRuleById); // Admin

export default router;
