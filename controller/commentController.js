import { instance as dbInstance } from "../DAO/dataStoreDao.js"

export const getAllComments= async(req , res)=>{
    const allComments = await dbInstance.getAllComments()
    return res.status(200).send(allComments)
}
export const getCommentById = async (req , res)=>{}


export const createComment = async(req , res)=>{
    const postId = req.params.postId
    const comment = req.body.comment
    const userId = req.body.userId

    const post = await dbInstance.getPostById(postId)
    if(!post){
        return res.status(400).send("Post Not Found")
    }

    const user = await dbInstance.getUserById(userId)
    if(!user){
        return res.status(400).send("User Not Found")
    }

    const newComment = await dbInstance.createComment({comment , userId , postId})
    return res.status(201).send(newComment)
}

export const deleteComment = async (req , res)=>{
    const commentId = req.params.commId
    const postId = req.params.postId

    const post = await dbInstance.getPostById(postId)
    if(!post){
        return res.status(400).send("Post Not Found")
    }

    const comment = await dbInstance.getCommentById(commentId)
    if(!comment){
        return res.status(200).send("Comment Not Found")
    }

    const deletedComment = await dbInstance.deleteComment(commentId)
    return res.status(20).send(deletedComment)
}

export const updateComment = async (req , res)=>{
    const postId = req.params.postId
    const commentId = req.params.commId
    const userId = req.body.userId
    const comment = req.body

    const existedPost = await dbInstance.getPostById(postId)
    if(!existedPost){
        return res.status(400).send("Post Not Found")
    }

    const existedUser = await dbInstance.getUserById(userId)
    if(!existedUser){
        return res.status(400).send("User Not Found")
    }

    const existedComment = await dbInstance.getCommentById(commentId)
    if(!existedComment){
        return res.status(400).send("Comment Not Found")
    }

    const updatedComment = await dbInstance.updateComment(commentId ,postId , comment)
    return res.status(200).send(updatedComment)
}