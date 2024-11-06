import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthUser } from "@/models/user/types";
import { UserModel } from "@/models/user";
import bcrypt from "bcrypt";
import { UserService } from "@/services/userService";
import { createAccessToken } from "@/utils/createAccessToken";
import { TokenService } from "@/services/tokenService";

const userService = new UserService();
const tokenService = new TokenService();
export class AuthController {
	constructor() {
	}
	
	async login(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		try {
			
			const userData: AuthUser = {
				...req.body
			};
			
			const data = await userService.login(userData.name, userData.password);
			
			res.cookie("refreshToken", data.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			
			res.status(200).send({
				messages: `Login complete`,
				refreshToken: data.refreshToken,
				accessToken: data.accessToken,
				user: {
					id: data.user.id,
					name: data.user.name
				}
			});
			
		} catch (error) {
			console.warn(error);
			res.status(400).send(error.message);
		}
		
		
	}
	
	async registration(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		try {
			
			const user: AuthUser = {
				...req.body
			};
			
			const registeredUser = await userService.registration(user.name, user.password);
			
			res.cookie("refreshToken", registeredUser.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			
			res.status(200).send({
				messages: `User registred`,
				refreshToken: registeredUser.refreshToken,
				accessToken: registeredUser.accessToken,
				user: {
					id: registeredUser.user.id,
					name: registeredUser.user.name
				}
				
			});
		} catch (error) {
			console.warn(error);
			res.status(400).send("Login error");
		}
	}
	
	async logout(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		try {
			const { refreshToken } = req.cookies;
			
			const token = await userService.logout(refreshToken)
			
			res.clearCookie("refreshToken");
			
			res.status(200).send({
				message: `User logged out`,
				token
			});
		} catch (error) {
			console.warn(error);
			res.status(400).send("Logout error");
		}
	}
	
	async refresh(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		try {
			const { refreshToken } = req.cookies;
			const userData= await userService.refresh(refreshToken)
			
			res.cookie("refreshToken", userData.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			
			res.status(200).send({
				messages: `Refresh complete`,
				refreshToken: userData.refreshToken,
				accessToken: userData.accessToken,
				user: {
					id: userData.user.id,
					name: userData.user.name
				}
			});
			
		} catch (error) {
			console.warn(error);
			res.status(400).send("Refresh error");
		}
		
		
	}
	
	
	async getUsers(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		
		try {
		
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `Comment was updated`
		});
	}
	
}