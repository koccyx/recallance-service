import express from "express";
import { RecallController } from "@/controllers/recallController";
import { ProductController } from "@/controllers/productController";
import { body } from "express-validator";
import { authMiddleware } from "@/middlewares/authMiddleware";

const productController = new ProductController();
export const router = express.Router({ mergeParams: true });

router.get("/:productId", authMiddleware, productController.getProduct);
router.get("/", authMiddleware, productController.getProducts);
router.post("/", body(["name"]).notEmpty(), authMiddleware, productController.createProduct);
router.put("/:productId", authMiddleware, productController.updateProduct);
router.delete("/:productId", authMiddleware, productController.deleteProduct);


