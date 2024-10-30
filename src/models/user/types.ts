import { Types } from "mongoose";
import { ToApi } from "@/types/toApi";

export interface User {
	token: string;
	name: string;
	email: string;
	products?: Types.ObjectId[];
}

export interface UserApi extends ToApi<User>{}