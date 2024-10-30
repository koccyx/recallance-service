import { User } from "@/models/user/types";
import { UserModel } from "@/models/user";
import { RecallModel } from "@/models/recall";

export class RecallService {
	async createRecall(userData: User) {
		try {
			const user = new RecallModel(userData);
			await user.save();
			
			return user;
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async updateRecall(recallId: number|string, recallData: Partial<User>) {
		try {
			return await RecallModel.findByIdAndUpdate(recallId, recallData, { returnOriginal: false });
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async deleteRecall(recallId: number|string) {
		try {
			return await RecallModel.findByIdAndDelete(recallId);
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async getRecall(recallId: number|string) {
		try {
			return await RecallModel.findById(recallId);
		} catch (error) {
			throw new Error(error);
		}
	}
}