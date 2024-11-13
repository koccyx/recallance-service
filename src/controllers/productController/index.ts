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
			return res.status(400).send(result.array());
		}
		
		let product: ProductApi;
		
		const { id } = req.user;
		
		const productData: ProductApi = {
			...req.body,
			owner: id,
			recalls: []
		}
		
		try {
			product = await productService.createProduct(productData);
			
			return res.status(200).send({
				message: `Product ${product.name} was created`
			});
		} catch (error) {
			console.warn(error);
			
			return res.status(400).send({
				message: `Product was not created`
			});
		}
		
		
	}
	
	async deleteProduct(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			return res.status(400).send(result.array());
		}
		let product: ProductApi;
		
		try {
			const { id } = req.user;
			product = await productService.deleteProduct(id);
		} catch (error) {
			console.warn(error);
		}
		
		return res.status(200).send({
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
			const { id } = req.user;
			product = await productService.updateProduct(id, req.body);
		} catch (error) {
			console.warn(error);
		}
		
		res.status(200).send({
			message: `Product ${product.name} was updated`
		})
	}
	
	async getProducts(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		try {
			const { id } = req.user;
			
			const products = await productService.getProducts(id);
			
			res.status(200).send({
				message: "Products were fetched",
				payload: {
					products
				}
			})
		} catch(err) {
			console.warn(err);
		}
	}
	
	async getProduct(req: Request, res: Response) {
		const result = validationResult(req);
		
		if(!result.isEmpty()) {
			res.status(400).send(result.array());
		}
		
		let product: ProductApi;
		
		try {
			const { productId } = req.params;
			product = await productService.getProduct(productId);

			return res.status(200).send({
				message: "Product was fetched",
				payload: {
					product
				}
			})
		} catch (error) {
			console.warn(error);
		}
		
		
	}
}