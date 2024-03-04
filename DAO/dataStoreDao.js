// TodoDAO.js

import mongoose from 'mongoose';
// const { Mongoose , collection } = pkg;

import postModel from "../models/postModel.js";
import userModel from '../models/userModel.js';
import likeModel from '../models/likeModel.js';
import commentModel from "../models/commentModel.js"



class DataStoreDao {

  static #instance = null 

  constructor() {}

  static async getInstance() {
    if (DataStoreDao.#instance === null) {
      DataStoreDao.#instance = new DataStoreDao()
    }
    return DataStoreDao.#instance
  }

  async connectDb(connectionString) {
    try {
      await mongoose.connect(connectionString);
      console.log("Connection to MongoDB established");
      return true; // Indicate success
    } catch (error) {
      console.error("Connection to MongoDB failed:", error);
      return false; // Indicate failure
    }
  }

  // posts

  async createPost(postData) {
    try {
      const newPost = new postModel(postData);
      
      // const emptyPost = new postModel()
      // console.log(emptyPost);
      // await emptyPost.save();

      return await newPost.save();

    } catch (error) {
      throw new Error('Failed to create postModel');
    }
  }

  async getAllPosts() {
    try {
      return await postModel.find();
    } catch (error) {
      throw new Error('Failed to fetch postModels');
    }
  }

  async getPostById(id) {
    try {
      return await postModel.find({_id:id}).populate("user");
    } catch (error) {
      throw new Error('Failed to fetch postModel');
    }
  }

  async updatePost(id, updatedpostlData) {
    try {
      const newPost = await postModel.findByIdAndUpdate(id , updatedpostlData , {new : true})
      if (!newPost) {
          throw new Error('postModel not found');
        }
        return newPost;
      } catch (error) {
        throw new Error('Failed to update postModel');
      }
  }

  async deletePost(id) {
    try {
      const Post = await postModel.findByIdAndDelete(id)
      if (!Post) {
        throw new Error('post not found');
      }
      // const deletedPost = await Post.remove()
      return Post
    } catch (err) {
      // throw new Error('Failed to delete Post');
      console.log(err);
    }
  }

// USERS 

  async createUser (userData){
    try{
      const newUser = new userModel(userData)
      // const testUser = new userModel()
      // testUser.save()
      return await newUser.save()
    }catch (err) {
      console.log(err);
    }
  }

  async getUserById(id){

    const user = await userModel.find({_id:id}).populate("posts")

    return user
  }
  
  async getUserByEmail(email){
    try {
    const user = await userModel.findOne(email)
    return user
  }catch(err){
    console.log(err)
  }
}

  async updateUser(id , userData){
    try{
    const user = await userModel.findById({_id : id})
    if (!user) {
      throw new Error('User not found');
    }

  // Update user data
  user.firstName = userData.firstName;
  user.password = userData.password;
  user.email = userData.email;

  // Save the updated user
  await user.save();

  console.log('User updated successfully:', user);
  return user;
  }
  catch(err){
    console.log(err)
  }

  }

  async deleteUser (id) {
    const user = await userModel.findById(id)
    if(!user){
      throw new Error ("User Not Found")
    }

    const deletedUser = await user.remove()
    return deletedUser
  }

  async getAllUsers (){
    try {
      const allUsers = await userModel.find()
      if(!allUsers){
        throw new Error("No Users Yet")
      }

      return allUsers
    } catch(err){
      console.log(err);
    }
  }

  // ;IKES

  async createLike({userId , postId}){
      try{
        const newLike = await new likeModel({userId , postId}).populate({path : "userId"})
        return await newLike.save()
      }catch(err){
        console.log("Failed To Create Like" , err)
      }
  }
  
  // async deleteUser (id) {
  //   const user = await userModel.find({_id : id})
  //   if(!user){
  //     throw new Error ("User Not Found")
  //   }

  //   const deletedUser = await user.remove()
  //   return deletedUser
  // }


  async deleteLike(id) {
    try {
      const like = await likeModel.findByIdAndDelete(id)
      console.log(like)
      if (!like) {
        throw new Error('Like Not Found');
      }
      // const deletedPost = await Post.remove()
      return like
    } catch (err) {
      // throw new Error('Failed to delete Post');
      console.log(err);
    }
  }

  async getAllLikes(){
    try {
      const allLikes = await likeModel.find()
      if(!allLikes){
        throw new Error("No Likes Yet")
      }
      return allLikes
    }catch(err){
      console.log(err);
    }
  }
  
  // COMMENTS

  async createComment(commentData){
    try{
      const comment = await commentModel(commentData)
      await comment.save()
      return comment
    }catch(err){
      console.log(err)
    }
  }

  async getCommentById(id){
    try {
      const comment = await commentModel.findById(id)
      if(!comment){
      return "Comment Not Found"
      }

      return comment
    }catch(err){
      console.log(err)
    }
  }

  async deleteComment(id){
    try{
      const comment = await commentModel.findByIdAndDelete(id)
      if(!comment){
        return "Comment Not Found"
      }

      return comment
    }catch(err){
      console.log(err)
    }
  }

  async updateComment(id , postId , commentData){
    try{
      const comment = await commentModel.findById(id)
      if(!comment){
        return "Comment Not Found"
      }

      comment.comment = commentData.comment
      comment.postId = postId
      comment.userId = commentData.userId
      
      return await comment.save() 
    }catch(err){
      console.log(err)
    }
  }
  }


export const instance = await DataStoreDao.getInstance(); // Ensure it's awaited
// console.log(await instance.connectDb("mongodb://127.0.0.1:27017/codesquare"));

export default DataStoreDao


