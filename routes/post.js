import express from "express"
import {getAllPosts , getPostById , createPost , deletePost , updatePost} from "../controller/postController.js"
import authenticate from "../middlewares/authenticateMiddle.js"

const router = express.Router()

router.get("/:id" , authenticate , getPostById)

router.get("/" , authenticate , getAllPosts)

router.post("/" , authenticate , createPost)
router.put("/:id" , authenticate , updatePost)
router.patch("/:id" , authenticate , updatePost)

router.delete("/:id" , authenticate , deletePost)


export default router