import mongoose, { Schema, Types } from "mongoose";
import { Recall, RecallStatus } from "@/models/recall/types";

export const recallSchema = new Schema<Recall>({
	title: { type: String, required: true },
	text: { type: String, required: true },
	authorId: { type: Schema.Types.ObjectId, ref: "User", required: true  },
	authorName: { type: String , required: true },
	upVotes: { type: Number, required: true, default: 0 },
	upVotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
	product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	status: { type: String, enum: Object.keys(RecallStatus), required: true, default: RecallStatus.empty }
});

recallSchema.pre('save', function (next) {
	this.upVotes = this.upVotedBy.length;
	next();
});

recallSchema.pre('findOneAndUpdate', function (next) {
	const update = this.getUpdate();
	
	if(update && update.upVotedBy) {
		update.upVotes = update.upVotedBy.length;
	}
	
	next()
});

recallSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

export const RecallModel = mongoose.model("Recall", recallSchema);
