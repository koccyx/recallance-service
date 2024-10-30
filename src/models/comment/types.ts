import { Types } from "mongoose";
import { ToApi } from "@/types/toApi";

export interface Comment {
	text: string;
	owner: Types.ObjectId;
	recall: Types.ObjectId;
}

export interface CommentApi extends ToApi<Comment>{}