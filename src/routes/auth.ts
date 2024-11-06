import express from "express";
import { AuthController } from "@/controllers/authController";
import { check } from "express-validator";

export const router = express.Router();

const authController = new AuthController();

router.post("/registration", [
	check("name", "User name shouldnt be empty").notEmpty(),
	check("password", "User password should be more then 6 symbols").isLength({ min: 6 })
], authController.registration);
router.post("/login", [
	check("name", "User name shouldnt be empty").notEmpty(),
	check("password", "User password should be more then 6 symbols").isLength({ min: 6 })], authController.login);
router.get("/users", authController.getUsers);
router.get("/refresh", authController.refresh);
router.post("/logout", authController.logout);

