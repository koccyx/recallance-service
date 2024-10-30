import { Comment } from "@/models/comment/types";
import { CommentModel } from "@/models/comment/index";

export class CommentService {
	async createComment(commentData: Comment) {
		try {
			const comment = new CommentModel(commentData);
			await comment.save();
			
			return comment;
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async updateComment(commentId: number|string, commentData: Partial<Comment>) {
		try {
			return await CommentModel.findByIdAndUpdate(commentId, commentData, { returnOriginal: false });
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async deleteComment(commentId: number|string) {
		try {
			return await CommentModel.findByIdAndDelete(commentId);
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async getComment(commentId: number|string) {
		try {
			return await CommentModel.findById(commentId);
		} catch (error) {
			throw new Error(error);
		}
	}
}