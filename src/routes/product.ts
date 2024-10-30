import express from "express";
import { RecallController } from "@/controllers/recallController";
import { ProductController } from "@/controllers/productController";
import { body } from "express-validator";

const productController = new ProductController();
export const router = express.Router({ mergeParams: true });

router.get("/:productId", productController.getProduct);
router.post("/", body(["name"]).notEmpty(), productController.createProduct);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);


