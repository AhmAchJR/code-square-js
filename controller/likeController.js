import likeModel from "../models/likeModel.js"
import postModel from "../models/postModel.js"
import { instance as dbInstance } from "../DAO/dataStoreDao.js"

export const getAllLikes = async(req , res)=>{
    const allLikes = await dbInstance.getAllLikes()
    return res.status(200).send(allLikes)
}

export const createLike = async(req , res)=>{

    const postId = req.params.postId
    const userId = req.body.userId

    const post = postModel.find({_id : postId})
    if(!post){
        return res.status(400).send("Post Not Found")
    }

    const newLike = await dbInstance.createLike({userId , postId})
    return res.status(201).send(newLike) 

}

export const deleteLike = async (req , res)=>{
    const userId = req.body.id
    const postId = req.params.postId
    const likeId = req.params.likeId

    const post = await dbInstance.getPostById(postId)
    if(!post){
        return res.status(400).send("Post Not Found")
    }
    const user = await dbInstance.getUserById(userId)
    
    if(!user){
        return res.status(401).send("You Are Not Authorized")
    }
    
    const deletedLike = await dbInstance.deleteLike(likeId)

    return res.status(200).send(deletedLike)

}