import express, { Request, Response } from "express";
import { router as userRouter } from "@/routes/user";
import { router as recallRouter } from "@/routes/recall";
import { router as productRouter } from "@/routes/product";
import { router as commentRouter } from "@/routes/comment";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 3000;
mongoose.connect("mongodb://localhost:27017/main");


app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/recall", recallRouter);
app.use("/user/:userId/product", productRouter);
app.use("/recall/:recallId/comment", commentRouter);

app.listen(port, () => {
	console.log(`Example app listening FUCK on port ${port}`);
});