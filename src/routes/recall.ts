import express from "express";
import { RecallController } from "@/controllers/recallController";

const recallController = new RecallController();
export const router = express.Router();

router.get("/:recallId", recallController.getRecall);
router.post("/", recallController.createRecall);
router.put("/:recallId", recallController.updateRecall);
router.delete("/:recallId", recallController.deleteRecall);


