import { NextFunction, Request, Response } from "express";
import { TokenService } from "@/services/tokenService";

const tokenService = new TokenService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		
		if(!token) return res.status(401).send("User is unauthorized");
		
		const userData = tokenService.validateAccessToken(token);
		
		req.user = userData!.user;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).send("User is unauthorized");
	}
};