import express, { Response, Request } from "express";
import { UserController } from "@/controllers/userController";
import { body } from "express-validator";
import { authMiddleware } from "@/middlewares/authMiddleware";

const userController = new UserController();
export const router = express.Router();


router.get("/:userId", authMiddleware, userController.getUser);
router.post("/", body(["token", "name", "email"]).notEmpty(), userController.createUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

