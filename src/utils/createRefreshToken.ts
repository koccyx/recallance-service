import jwt from "jsonwebtoken";
import { REFRESH_SECRET } from "@/utils/secret";

export const createRefreshToken = (id) => {
	const payload = {
		id
	};
	
	return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "24h" });
};