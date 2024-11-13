import express from "express";
import { RecallController } from "@/controllers/recallController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const recallController = new RecallController();
export const router = express.Router({ mergeParams: true });

router.get("/", authMiddleware, recallController.getRecalls);
router.get("/:recallId",authMiddleware, recallController.getRecall);
router.post("/", authMiddleware, recallController.createRecall);
router.put("/:recallId", authMiddleware, recallController.updateRecall);
router.put("/:recallId/like", authMiddleware, recallController.likeRecall);
router.put("/:recallId/unLike", authMiddleware, recallController.unLikeRecall);
router.put("/:recallId/status", authMiddleware, recallController.changeStatus);
router.delete("/:recallId", authMiddleware, recallController.deleteRecall);


