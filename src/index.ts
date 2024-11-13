import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as process from "node:process";
import { router as recallRouter } from "@/routes/recall";
import { router as productRouter } from "@/routes/product";
import { router as authRouter } from "@/routes/auth";
import { exceptionMiddleware } from "@/middlewares/exceptionMiddleware";

const app = express();
const port = process.env.DEFAULT_PORT;
mongoose.connect(process.env.MONGO_URI!);


app.use(express.json());
app.use(cors({
	credentials: true,
	origin: process.env.WEBAPP_BASE_URL
}));
app.use(cookieParser());

app.use("/product/:productId/recall", recallRouter);
app.use("/product", productRouter);
app.use("/auth", authRouter);

app.use(exceptionMiddleware);


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});