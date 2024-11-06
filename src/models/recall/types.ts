import { Types } from "mongoose";
import { ToApi } from "@/types/toApi";
export enum RecallStatus {
	inProgress = "inProgress",
	cancelled = "cancelled",
	planned = "planned",
	shipped = "shipped",
	empty = "empty"
}
export interface Recall {
	title: string;
	text: string;
	author: Types.ObjectId;
	product: Types.ObjectId;
	upVotes: number;
	status: RecallStatus
}

export interface RecallApi extends ToApi<Recall>{}