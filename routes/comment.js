
import express from "express"
import { getAllComments , deleteComment , createComment , getCommentById, updateComment } from "../controller/commentController.js"
const router = express.Router()

router.get("/comment" , getAllComments)
router.get("/post/:postId/comment/:commId" , getCommentById)

router.delete("/post/:postId/comment/:commId" ,  deleteComment)
router.post("/post/:postId/comment" , createComment)

router.patch("/post/:postId/comment/:commId" , updateComment)
router.put("/post/:postId/comment/:commId" , updateComment)


export default router