import express from "express";
import { RecallController } from "@/controllers/recallController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const recallController = new RecallController();
export const router = express.Router({ mergeParams: true });

router.get("/", recallController.getRecalls);
router.get("/:recallId", recallController.getRecall);
router.post("/", authMiddleware, recallController.createRecall);
router.put("/:recallId", authMiddleware, recallController.updateRecall);
router.delete("/:recallId", authMiddleware, recallController.deleteRecall);


