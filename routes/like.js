import express from "express"
import { createLike, deleteLike, getAllLikes } from "../controller/likeController.js"
import authenticate from "../middlewares/authenticateMiddle.js"
const router = express.Router()

router.get("/like" ,  getAllLikes)
router.delete("/post/:postId/like/:likeId" , deleteLike)
router.post("/post/:postId/like" , createLike)


export default router