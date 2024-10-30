import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ProductApi } from "@/models/Product/types";
import { ProductService } from "@/services/productService";

const productService = new ProductService();

export class ProductController {
	constructor() {
	}
	
	async createProduct(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let product: ProductApi;
		
		const productData: ProductApi = {
			...req.body,
			owner: req.params['userId'] as string,
			recalls: []
		}
		
		try {
			product = await productService.createProduct(productData);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `Product ${product.name} was created`
		});
	}
	
	async deleteProduct(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		let product: ProductApi;
		
		try {
			const id = req.params['productId'];
			product = await productService.deleteProduct(id);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			messages: `Product ${product.title} was deleted`
		});
	}
	
	
	async updateProduct(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let product:ProductApi;
		
		try {
			const id = req.params['productId'];
			product = await productService.updateProduct(id, req.body);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `Product ${product.title} was updated`
		})
	}
	
	async getProduct(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let product: ProductApi;
		
		try {
			const id = req.params['productId'];
			product = await productService.getProduct(id);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: "Product was fetched",
			payload: {
				product: product
			}
		})
	}
}