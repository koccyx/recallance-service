import { Types } from "mongoose";
import { ToApi } from "@/types/toApi";

export interface User {
	password: string;
	name: string;
	products?: Types.ObjectId[];
}

export interface AuthUser {
	name: string;
	password: string;
}

export interface UserApi extends ToApi<User>{}