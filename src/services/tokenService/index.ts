import { createAccessToken } from "@/utils/createAccessToken";
import { createRefreshToken } from "@/utils/createRefreshToken";
import { TokenModel } from "@/models/token";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "@/utils/secret";

export class TokenService {
	generateTokens(payload) {
		const accessToken = createAccessToken(payload);
		const refreshToken = createRefreshToken(payload);
		
		return {
			accessToken,
			refreshToken
		};
	}
	
	async saveTokens(userId, refreshToken) {
		
		const tokenData = await TokenModel.findOneAndUpdate({ name: userId }, { refreshToken });
		
		if(!tokenData) {
			const token = new TokenModel({ name: userId, refreshToken });
			
			token.save();
		}
	}
	
	async removeToken(refreshToken: string) {
		const tokenData = await TokenModel.findOneAndDelete({ refreshToken });
		
		return tokenData;
	}
	
	async findToken(refreshToken: string) {
		const tokenData = await TokenModel.findOne({ refreshToken });
		
		return tokenData;
	}
	
	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, ACCESS_SECRET);
			
			return userData;
		} catch(err) {
			return null;
		}
	}
	
	async validateRefreshToken(token: string) {
		try {
			const userData = await jwt.verify(token, REFRESH_SECRET);
			
			return userData;
		} catch(err) {
			return null;
		}
	}
}