import jwt from "jsonwebtoken";
import process from "node:process";

export const createRefreshToken = (id) => {
	const payload = {
		id
	};
	
	return jwt.sign(payload, process.env.REFRESH_SECRET!, { expiresIn: "24h" });
};