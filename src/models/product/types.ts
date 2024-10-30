import { Types } from "mongoose";
import { ToApi } from "@/types/toApi";
import { User } from "@/models/user/types";

export interface Product {
	name: string;
	owner: Types.ObjectId;
	recalls: Types.ObjectId[];
}

export interface ProductApi extends ToApi<Product>{}
