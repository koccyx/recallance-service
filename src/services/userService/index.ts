import { User } from "@/models/user/types";
import { UserModel } from "@/models/user";

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
	
	async updateUser(userId: number|string, userData: Partial<User>) {
		try {
			return await UserModel.findByIdAndUpdate(userId, userData, { returnOriginal: false });
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async deleteUser(userId: number|string) {
		try {
			return await UserModel.findByIdAndDelete(userId);
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async getUser(userId: number|string) {
		try {
			return await UserModel.findById(userId);
		} catch (error) {
			throw new Error(error);
		}
	}
}