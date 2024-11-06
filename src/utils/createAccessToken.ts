import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "@/utils/secret";

export const createAccessToken = (user) => {
	const payload = {
		user
	};
	
	return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "30m" });
};