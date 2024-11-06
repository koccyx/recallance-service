import express from "express";
import { CommentController } from "@/controllers/commentController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const commentController = new CommentController();
export const router = express.Router({ mergeParams: true });

router.get("/:commentId", commentController.getComment);
router.post("/", authMiddleware, commentController.createComment);
router.put("/:commentId", authMiddleware, commentController.updateComment);
router.delete("/:commentId", authMiddleware, commentController.deleteComment);


