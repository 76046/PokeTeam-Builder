import { Router } from "express";
import * as controller from "../controllers/summary.js";
import auth from "../middleware/auth.js";
const router = Router();

// # == Summary

router.post("/", auth, controller.postSummary);
router.get("/summaries", auth, controller.getSummaries);
router.get("/user/:id", auth, controller.getSummariesForUser);
router.get("/public/:id", auth, controller.getSwichPublic);
router.get("/:id", auth, controller.getSummaryById);
router.patch("/:id", auth, controller.patchSummaryById);
router.delete("/:id", auth, controller.deleteSummaryById);

export default router;
