
import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    comment : {
        type : String , 
        required : true
    } , 
    postedAt : {
        type : Date , 
        default : Date.now()
    } , 
    postId : {type : mongoose.Schema.Types.ObjectId , ref : "posts"} , 
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "users"}
})

const commentModel = mongoose.model("comments" , commentSchema)
export default commentModel