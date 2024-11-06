import { AuthUser, User, UserApi } from "@/models/user/types";
import { UserModel } from "@/models/user";
import bcrypt from "bcrypt";
import { TokenService } from "@/services/tokenService";
import { createAccessToken } from "@/utils/createAccessToken";

const tokenService = new TokenService();
export class UserService {
	async createUser(userData: User) {
		try {
			const user = new UserModel(userData);
			await user.save();
			
			return user;
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async updateUser(userId: number | string, userData: Partial<User>) {
		try {
			return await UserModel.findByIdAndUpdate(userId, userData, { returnOriginal: false });
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async deleteUser(userId: number | string) {
		try {
			return await UserModel.findByIdAndDelete(userId);
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async getUser(userId: number | string) {
		try {
			return await UserModel.findById(userId);
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async findUserByName(name: string): Promise<UserApi> {
		try {
			return await UserModel.findOne({ name });
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async registration(name: string, password: string) {
		
		const candidate = await UserModel.findOne({ name });
		
		if(candidate) {
			throw new Error("Пользователь с таким именем уже существует");
		}
		
		const hashedPassword = bcrypt.hashSync(password, 7);
		
		const user = await this.createUser({
			name,
			password: hashedPassword
		});
		
		const tokens = tokenService.generateTokens({ name, password, id: user.id });
		
		await tokenService.saveTokens(user.id, tokens.refreshToken);
		
		return {
			...tokens,
			user
		}
	}
	
	async login(name: string, password: string) {
		const user = await this.findUserByName( name );
		
		if(!user) {
			throw new Error("No user with such a name");
		}
		
		const validPassword = bcrypt.compareSync(password, user.password);
		
		if(!validPassword) throw new Error("Wrong password");
		
		const tokens = tokenService.generateTokens(user);
		
		await tokenService.saveTokens(user.id, tokens.refreshToken);
		
		return {
			...tokens,
			user
		}
	}
	
	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		
		return token;
	}
	
	async refresh(refreshToken: string) {
		if(!refreshToken) {
			throw new Error("No refresh token");
		}
		
		const { id: user } = await tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = tokenService.findToken(refreshToken);
		
		if(!user || !tokenFromDb) {
			throw new Error("Unauthorized Error");
		}
		
		const userFromDb = await UserModel.findById(user.id) as UserApi;
		
		const tokens = tokenService.generateTokens(userFromDb);
		
		await tokenService.saveTokens(userFromDb.id, tokens.refreshToken);
		
		return {
			...tokens,
			user: userFromDb
		}
		
	}
}