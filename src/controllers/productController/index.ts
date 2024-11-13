import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ProductApi } from "@/models/Product/types";
import { ProductService } from "@/services/productService";
import { ApiError } from "@/exceptions/apiError";

const productService = new ProductService();

export class ProductController {
	constructor() {
	}
	
	async createProduct(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const { id } = req.user;
			
			const productData: ProductApi = {
				...req.body,
				owner: id,
				recalls: []
			}
			
			const product = await productService.createProduct(productData);
			
			return res.status(200).send({
				message: `Product ${product.name} was created`
			});
		} catch (error) {
			next(error);
		}
		
		
	}
	
	async deleteProduct(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const { id } = req.user;
			
			const product = await productService.deleteProduct(id);
			
			return res.status(200).send({
				messages: `Product ${product.title} was deleted`
			});
		} catch (error) {
			next(error);
		}
	}
	
	
	async updateProduct(req: Request, res: Response, next: NextFunction) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const { id } = req.user;
			
			const product = await productService.updateProduct(id, req.body);
			
			return res.status(200).send({
				message: `Product ${product.name} was updated`
			})
		} catch (error) {
			next(error);
		}
		
		
	}
	
	async getProducts(req: Request, res: Response) {
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const { id } = req.user;
			
			const products = await productService.getProducts(id);
			
			return res.status(200).send({
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
		try {
			const result = validationResult(req);
			
			if(!result.isEmpty()) {
				throw ApiError.BadRequest("Not enough data", result.array());
			}
			
			const { productId } = req.params;
			
			const product = await productService.getProduct(productId);

			return res.status(200).send({
				message: "Product was fetched",
				payload: {
					product
				}
			})
		} catch (error) {
			next(error);
		}
		
		
	}
}