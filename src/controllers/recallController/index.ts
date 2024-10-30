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
		
		let recall: RecallApi;
		
		try {
			recall = await recallService.createRecall(req.body);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `Recall ${recall.title} was created`
		});
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
}