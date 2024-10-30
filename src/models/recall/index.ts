import mongoose, { Schema } from "mongoose";
import { Recall, RecallStatus } from "@/models/recall/types";

export const recallSchema = new Schema<Recall>({
	title: { type: String, required: true },
	text: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: "User" },
	upVotes: { type: Number, required: true },
	status: { type: String, enum: Object.keys(RecallStatus), required: true }
});

recallSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

export const RecallModel = mongoose.model("Recall", recallSchema);
