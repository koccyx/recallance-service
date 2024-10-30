import { User } from "@/models/user/types";
import { Schema } from "mongoose";
import * as mongoose from "mongoose";

export const commentSchema = new Schema<Comment>({
	text: { type: String, required: true },
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	recall: { type: Schema.Types.ObjectId, ref: "Recall" }
});

commentSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

export const CommentModel = mongoose.model("Comment", commentSchema);