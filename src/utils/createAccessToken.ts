import jwt from "jsonwebtoken";
import process from "node:process";

export const createAccessToken = (user) => {
	const payload = {
		user
	};
	
	return jwt.sign(payload, process.env.ACCESS_SECRET!, { expiresIn: "30 m" });
};