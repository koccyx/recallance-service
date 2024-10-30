import { Product } from "@/models/product/types";
import { ProductModel } from "@/models/product";

export class ProductService {
	async createProduct(productData: Product) {
		try {
			const product = new ProductModel(productData);
			await product.save();
			
			return product;
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async updateProduct(productId: number|string, productData: Partial<Product>) {
		try {
			return await ProductModel.findByIdAndUpdate(productId, productData, { returnOriginal: false });
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async deleteProduct(productId: number|string) {
		try {
			return await ProductModel.findByIdAndDelete(productId);
		} catch (error) {
			throw new Error(error);
		}
	}
	
	async getProduct(productId: number|string) {
		try {
			return await ProductModel.findById(productId);
		} catch (error) {
			throw new Error(error);
		}
	}
}