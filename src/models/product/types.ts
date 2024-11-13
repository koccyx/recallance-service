import { Types } from "mongoose";
import { ToApi } from "@/types/toApi";

export interface Product {
	name: string;
	owner: Types.ObjectId;
	recalls: Types.ObjectId[];
}

export interface ProductApi extends ToApi<Product>{}
