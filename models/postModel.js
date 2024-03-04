
import mongoose from "mongoose";
import userModel from "./userModel.js";

const postSchema = new mongoose.Schema({
    title : { type: String, required: true },
    description : { type: String , required : true },
    reviews : [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    Date: {
          type: Date,
          required: true,
          match: /^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/,
          default : Date.now()
    },

    // image: { type: String, required: true },
    user : { type: mongoose.Schema.Types.ObjectId, ref: "users" } , 
    likes : [{type : mongoose.Schema.Types.ObjectId , ref : "likes"}] , 
    comments : [{type : mongoose.Schema.Types.ObjectId , ref : "comments"}]
  }); //schema


const postModel = mongoose.model("posts" , postSchema)

export default postModel