import { User, UserApi } from "@/models/user/types";
import mongoose, { Schema } from "mongoose";
import { Token, TokenApi } from "@/models/token/types";

export const tokenSchema = new Schema<TokenApi>({
	name: { type: Schema.Types.ObjectId, ref: "User" },
	refreshToken: { type: String, required: true }
});

tokenSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

export const TokenModel = mongoose.model("Token", tokenSchema);
