import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserService } from "@/services/userService";
import { User, UserApi } from "@/models/user/types";

const userService = new UserService();

export class UserController {
	constructor() {
	}
	
	async createUser(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			return res.status(400).send(result.array());
		}
		
		let user: User;
		
		try {
			user = await userService.createUser(req.body);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `User ${user.name} was created`
		});
	}
	
	async deleteUser(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		let user: User;
		
		try {
			const id = req.params['userId'];
			user = await userService.deleteUser(id);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			messages: `User ${user.name} was deleted`
		});
	}
	
	
	async updateUser(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let user:User;
		
		try {
			const id = req.params['userId'];
			user = await userService.updateUser(id, req.body);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `User ${user.name} was updated`
		})
	}
	
	async getUser(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let user: UserApi;
		
		try {
			const id = req.params['userId'];
			user = await userService.getUser(id);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: "User was fetched",
			payload: {
				user: user
			}
		})
	}
}