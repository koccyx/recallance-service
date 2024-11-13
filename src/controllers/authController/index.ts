import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthUser } from "@/models/user/types";
import { UserService } from "@/services/userService";
import { ApiError } from "@/exceptions/apiError";

const userService = new UserService();

export class AuthController {
	constructor() {
	}
	
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const userData: AuthUser = {
				...req.body
			};
			
			const data = await userService.login(userData.name, userData.password);
			
			res.cookie("refreshToken", data.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			
			return res.status(200).send({
				message: `Login complete`,
				refreshToken: data.refreshToken,
				accessToken: data.accessToken,
				user: {
					id: data.user.id,
					name: data.user.name
				}
			});
			
		} catch (error) {
			next(error);
		}
		
		
	}
	
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			
			const user: AuthUser = {
				...req.body
			};
			
			const registeredUser = await userService.registration(user.name, user.password);
			
			res.cookie("refreshToken", registeredUser.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			
			return res.status(200).send({
				messages: `User registred`,
				refreshToken: registeredUser.refreshToken,
				accessToken: registeredUser.accessToken,
				user: {
					id: registeredUser.user.id,
					name: registeredUser.user.name
				}
				
			});
		} catch (error) {
			next(error);
		}
	}
	
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			
			const { refreshToken } = req.cookies;
			
			const token = await userService.logout(refreshToken)
			
			res.clearCookie("refreshToken");
			
			return res.status(200).send({
				message: `User logged out`,
				token
			});
		} catch (error) {
			next(error);
		}
	}
	
	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const { refreshToken } = req.cookies;
			const userData= await userService.refresh(refreshToken)
			
			res.cookie("refreshToken", userData.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			
			return res.status(200).send({
				messages: `Refresh complete`,
				refreshToken: userData.refreshToken,
				accessToken: userData.accessToken,
				user: {
					id: userData.user.id,
					name: userData.user.name
				}
			});
			
		} catch (error) {
			next(error);
		}
	}
}