import postModel from "../models/postModel.js"
import {instance as dbInstance} from "../DAO/dataStoreDao.js"

export const createPost = async (req , res)=>{
    try{
        if(!req.body.title || !req.body.description){
            return res.status(400).send("title & description required")
        }

        const newPost = req.body
        
        const savedPost  = await dbInstance.createPost(newPost)
        return res.send(savedPost)
        // const testPost = new postModel()
        // await testPost.save()

        // const savedPost = await postModel.bulkSave(newPost)
        // return res.json(savedPost)
    }catch (error) {
        return res.send(error);
    }
}

export const getPostById = async (req , res)=>{
        const id = req.params.id
        const post = await dbInstance.getPostById(id)
        return res.status(200).send(post)

}

export const getAllPosts = async (req , res)=>{

    const allPosts = await dbInstance.getAllPosts()
    return res.status(200).send(allPosts)

}

export const deletePost = async(req , res)=>{

    const postId = req.params.id

    const post = await postModel.find({_id  : postId})
    if(!post){
        return res.status(400).send("Post Not Found")
    }

    const deletedPost = await dbInstance.deletePost(postId)

    return res.status(201).send(deletedPost)
}

export const updatePost = async (req , res)=>{
    const id = req.params.id
    const post = req.body

    const updatedPost = await dbInstance.updatePost(id , post)

    return res.status(200).send(updatedPost)
}