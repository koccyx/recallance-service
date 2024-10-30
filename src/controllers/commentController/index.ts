import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CommentApi } from "@/models/Comment/types";
import { CommentService } from "@/services/commentService";

const commentService = new CommentService();

export class CommentController {
	constructor() {
	}
	
	async createComment(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let comment: CommentApi;
		
		const commentData: CommentApi = {
			...req.body,
			recall: req.params['recallId'] as string
		}
		
		try {
			comment = await commentService.createComment(commentData);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `Comment was created`
		});
	}
	
	async deleteComment(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		let comment: CommentApi;
		
		try {
			const id = req.params['commentId'];
			comment = await commentService.deleteComment(id);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			messages: `Comment was deleted`
		});
	}
	
	
	async updateComment(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let comment:CommentApi;
		
		try {
			const id = req.params['commentId'];
			comment = await commentService.updateComment(id, req.body);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `Comment was updated`
		})
	}
	
	async getComment(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let comment: CommentApi;
		
		try {
			const id = req.params['commentId'];
			comment = await commentService.getComment(id);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: "Comment was fetched",
			payload: {
				comment: comment
			}
		})
	}
}