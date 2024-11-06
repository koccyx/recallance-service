import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RecallService } from "@/services/recallService";
import { Recall, RecallApi } from "@/models/recall/types";

const recallService = new RecallService();

export class RecallController {
	constructor() {
	}
	
	async createRecall(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		
		try {
			
			const recall = {
				...req.body,
				product: req.params["productId"],
				author: req.user.id
			}
			
			const recallAnsw = await recallService.createRecall(recall);
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
			const id = req.params['recallId'];
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
		
		let recall:RecallApi;
		
		try {
			const id = req.params['recallId'];
			recall = await recallService.updateRecall(id, req.body);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `recall ${recall.title} was updated`
		})
	}
	
	async getRecall(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let recall: RecallApi;
		
		try {
			const id = req.params['recallId'];
			recall = await recallService.getRecall(id);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: "recall was fetched",
			payload: {
				recall: recall
			}
		})
	}
	
	async getRecalls(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		try {
			const id = req.params['productId'];
			const recalls = await recallService.getRecalls(id);
			
			res.status(200).send({
				message: "Recalls were fetched",
				payload: {
					recalls
				}
			})
		} catch (error) {
			console.warn(error);
			
			res.status(500).send({ message: "Wrong" });
		}
		
		
	}
}