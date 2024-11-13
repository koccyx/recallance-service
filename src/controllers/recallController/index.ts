import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RecallService } from "@/services/recallService";
import { Recall, RecallApi, RecallMappper } from "@/models/recall/types";
import { ProductService } from "@/services/productService";

const recallService = new RecallService();
const productService = new ProductService();

export class RecallController {
	constructor() {
	}
	
	async createRecall(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		
		try {
			
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
			console.warn(error);
		}
		
		
	}
	
	async deleteRecall(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		let recall: RecallApi;
		
		try {
			const id = req.params["recallId"];
			recall = await recallService.deleteRecall(id);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			messages: `Recall ${recall.title} was deleted`
		});
	}
	
	
	async updateRecall(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let recall: RecallApi;
		
		try {
			const id = req.params["recallId"];
			recall = await recallService.updateRecall(id, req.body);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `recall ${recall.title} was updated`
		});
	}
	
	async getRecall(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let recall: RecallApi;
		
		try {
			const id = req.params["recallId"];
			recall = await recallService.getRecall(id);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: "recall was fetched",
			payload: {
				recall: recall
			}
		});
	}
	
	
	async getRecalls(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			return res.status(400).send(result.array());
		}
		
		try {
			const id = req.params["productId"];
			const { id: userId } = req.user;
			
			const { search } = req.query;
			
			const recalls = search ? await recallService.getRecallsByTitle(id, search as string) : await recallService.getRecalls(id);
			
			const mappedRecalls = recalls.map((recall) => RecallMappper.map(recall, userId));
			
			res.status(200).send({
				message: "Recalls were fetched",
				payload: {
					recalls: mappedRecalls
				}
			});
		} catch (error) {
			console.warn(error);
			
			res.status(500).send({ message: "Wrong" });
		}
	}
	
	async likeRecall(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			return res.status(400).send(result.array());
		}
		
		try {
			const id = req.params["recallId"];
			const { id: userId } = req.user;
			
			const recall = await recallService.getRecall(id);
			
			if(!recall) {
				return res.status(404).send({
					message: "Not found recall"
				});
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
			console.warn(error);
			
			res.status(500).send({ message: "Recall error" });
		}
	}
	
	async unLikeRecall(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			return res.status(400).send(result.array());
		}
		
		try {
			const id = req.params["recallId"];
			const { id: userId } = req.user;
			
			const recall = await recallService.getRecall(id);
			
			if(!recall) {
				return res.status(404).send({
					message: "Not found recall"
				});
			}
			
			recall.upVotedBy = recall.upVotedBy!.filter((user) => {
				return !user.equals(userId);
			});
			console.log(recall.upVotedBy);
			await recall.save();
			
			return res.status(200).send({
				message: "Recalls was unLiked(",
				payload: {
					recall
				}
			});
		} catch (error) {
			console.warn(error);
			
			return res.status(500).send({ message: "Recall error" });
		}
	}
	
	async changeStatus(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			return res.status(400).send(result.array());
		}
		
		try {
			const id = req.params["recallId"];
			const { id: userId } = req.user;
			
			const recall = await recallService.getRecall(id);
			
			if(!recall) {
				return res.status(404).send({
					message: "Not found recall"
				});
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
			console.warn(error);
			
			return res.status(500).send({ message: "Recall error" });
		}
	}
}