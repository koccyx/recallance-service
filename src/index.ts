import express, { Request, Response } from "express";
import { router as userRouter } from "@/routes/user";
import { router as recallRouter } from "@/routes/recall";
import { router as productRouter } from "@/routes/product";
import { router as commentRouter } from "@/routes/comment";
import { router as authRouter } from "@/routes/auth";

import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;
mongoose.connect("mongodb://localhost:27017/main");


app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use("/user", userRouter);
app.use("/product/:productId/recall", recallRouter);
app.use("/product", productRouter);
app.use("/recall/:recallId/comment", commentRouter);
app.use("/auth", authRouter)

app.listen(port, () => {
	console.log(`Example app listening FUCK on port ${port}`);
});