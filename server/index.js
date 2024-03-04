// import mongoose from "mongoose"
// import errorHandler from "../middlewares/errorHnadler.js"

import express from "express";
import { instance as dbInstance } from "../DAO/dataStoreDao.js";
import dataStoreDao from "../DAO/dataStoreDao.js";
import loggingMiddle from "../middlewares/loggingMiddle.js";
import postRouter from "../routes/post.js";
import userRouter from "../routes/user.js";
import likeRouter from "../routes/like.js"
import commentRouter from "../routes/comment.js"
import errorHandler from "../middlewares/errorHandler.js"

import dotenv from "dotenv"
import { signIn, signUp } from "../middlewares/sign.js";
import authenticate from "../middlewares/authenticateMiddle.js";

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// const dataStoreDaoInstance = dataStoreDao.getInstance();

dbInstance.connectDb("mongodb://127.0.0.1:27017/codesquare")


app.use(loggingMiddle);
app.use("/healthz" , (req , res)=>{res.send({status : "ok"})})
app.use("/login" , signIn)
app.use("/signup" , signUp)
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/api" , authenticate , likeRouter)
app.use("/api" , authenticate , commentRouter)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server Listen To ${PORT}`)
});