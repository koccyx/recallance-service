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
	authorId: Types.ObjectId;
	authorName: string;
	product: Types.ObjectId;
	upVotes: number;
	upVotedBy?: Types.ObjectId[];
	status: RecallStatus;
	id?: string;
}

export interface RecallApi extends Omit<ToApi<Recall>, "UpVotedBy">{
	isUpvoted: boolean;
}

export class RecallMappper {
	
	static map(source: Recall, userId: Types.ObjectId): RecallApi {
		return {
			id: source.id!,
			title: source.title,
			text: source.text,
			authorId: source.authorId,
			authorName: source.authorName,
			product: source.product,
			upVotes: source.upVotedBy ? source.upVotedBy!.length : 0,
			isUpvoted: source.upVotedBy ? source.upVotedBy!.includes(userId) : false,
			status: source.status!
		};
	}
	
}