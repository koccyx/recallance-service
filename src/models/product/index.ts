import { Schema, Types } from "mongoose";
import { Product } from "@/models/product/types";
import mongoose from "mongoose";

export const productSchema = new Schema<Product>({
	name: { type: String, required: true },
	owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
	recalls: [{ type: Schema.Types.ObjectId, ref: "Recall", required: true }]
});

productSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

export const ProductModel = mongoose.model("Product", productSchema);
