import { Types } from "mongoose";
import { ToApi } from "@/types/toApi";

export interface Token {
	user:  Types.ObjectId;
	refreshToken: string;
}

export interface TokenApi extends ToApi<TokenApi>{}