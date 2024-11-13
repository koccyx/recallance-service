import { User, UserApi } from "@/models/user/types";
import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema<UserApi>({
	password: { type: String, required: true },
	name: { type: String, required: true, unique: true },
	products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

userSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

export const UserModel = mongoose.model("User", userSchema);
