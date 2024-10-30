import express from "express";
import { CommentController } from "@/controllers/commentController";

const commentController = new CommentController();
export const router = express.Router({ mergeParams: true });

router.get("/:commentId", commentController.getComment);
router.post("/", commentController.createComment);
router.put("/:commentId", commentController.updateComment);
router.delete("/:commentId", commentController.deleteComment);


