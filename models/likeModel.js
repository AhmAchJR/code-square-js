
import mongoose from "mongoose"

const likeSchema = new mongoose.Schema({
    postId : {type : mongoose.Schema.Types.ObjectId , ref : "posts"} ,
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "users"}
})

const likeModel = mongoose.model("likes" , likeSchema)

export default likeModel