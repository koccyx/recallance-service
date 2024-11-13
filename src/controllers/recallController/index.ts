import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RecallService } from "@/services/recallService";
import { RecallApi, RecallMappper } from "@/models/recall/types";
import { ProductService } from "@/services/productService";
import { ApiError } from "@/exceptions/apiError";

const recallService = new RecallService();
const productService = new ProductService();

export class RecallController {
	constructor() {
	}
	
	async createRecall(req: Request, res: Response, next: NextFunction) {
		try {
			
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const { productId } = req.params;
			
			const recall = {
				...req.body,
				product: productId,
				authorId: req.user.id,
				authorName: req.user.name
			};
			
			const recallAnsw = await recallService.createRecall(recall);
			
			await productService.addRecallToProduct(productId, recallAnsw.id);
			
			res.status(200).send({
				message: `Recall ${recallAnsw.title} was created`
			});
		} catch (error) {
			next(error);
		}
		
		
	}
	
	async deleteRecall(req: Request, res: Response, next: NextFunction) {
		
		
		try {
			
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			let recall: RecallApi;
			
			const id = req.params["recallId"];
			recall = await recallService.deleteRecall(id);
			
			return res.status(200).send({
				messages: `Recall ${recall.title} was deleted`
			});
		} catch (error) {
			next(error);
		}
		
		
	}
	
	
	async updateRecall(req: Request, res: Response, next: NextFunction) {
		try {
			
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const id = req.params["recallId"];
			
			const recall = await recallService.updateRecall(id, req.body);
			
			if(!recall) throw ApiError.BadRequest("Not enough data", result.array());
			
			return res.status(200).send({
				message: `recall ${recall!.title} was updated`
			});
		} catch (error) {
			next(error);
		}
		
		
	}
	
	async getRecall(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const id = req.params["recallId"];
			
			const recall = await recallService.getRecall(id);
			
			return res.status(200).send({
				message: "recall was fetched",
				payload: {
					recall: recall
				}
			});
		} catch (error) {
			next(error);
		}
	}
	
	
	async getRecalls(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const id = req.params["productId"];
			const { id: userId } = req.user;
			
			const { search } = req.query;
			
			const recalls = search ? await recallService.getRecallsByTitle(id, search as string) : await recallService.getRecalls(id);
			
			const mappedRecalls = recalls.map((recall) => RecallMappper.map(recall, userId));
			
			return res.status(200).send({
				message: "Recalls were fetched",
				payload: {
					recalls: mappedRecalls
				}
			});
		} catch (error) {
			next(error);
		}
	}
	
	async likeRecall(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			
			const id = req.params["recallId"];
			const { id: userId } = req.user;
			
			const recall = await recallService.getRecall(id);
			
			if(!recall) {
				throw ApiError.BadRequest("Recall not found", result.array());
			}
			
			recall.upVotedBy!.push(userId);
			
			await recall.save();
			
			return res.status(200).send({
				message: "Recalls was Liked!",
				payload: {
					recall
				}
			});
		} catch (error) {
			next(error);
		}
	}
	
	async unLikeRecall(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const id = req.params["recallId"];
			const { id: userId } = req.user;
			
			const recall = await recallService.getRecall(id);
			
			if(!recall) {
				throw ApiError.BadRequest("Recall not found", result.array());
			}
			
			recall.upVotedBy = recall.upVotedBy!.filter((user) => {
				return !user.equals(userId);
			});
			
			await recall.save();
			
			return res.status(200).send({
				message: "Recalls was unLiked(",
				payload: {
					recall
				}
			});
		} catch (error) {
			next(error);
		}
	}
	
	async changeStatus(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const id = req.params["recallId"];
			const { id: userId } = req.user;
			
			const recall = await recallService.getRecall(id);
			
			if(!recall) {
				throw ApiError.BadRequest("Recall not found", result.array());
			}
			
			const { status } = req.body;
			
			recall.status = status;
			await recall.save();
			
			return res.status(200).send({
				message: "Recall status was updated",
				payload: {
					recall
				}
			});
		} catch (error) {
			next(error);
		}
	}
}