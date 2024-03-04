
import express from "express"
import {getUserById , getUsers , createUser, deleteUser, updateUser} from "../controller/userController.js"
import authorization from "../middlewares/authorizingMiddle.js"
import authenticate from "../middlewares/authenticateMiddle.js"

const router = express.Router()

router.get("/" , authenticate , getUsers)
router.get("/:id" , authenticate , getUserById )

router.post("/" , authenticate , createUser)
router.patch("/:id" , authenticate , updateUser)

router.delete("/:id"  , authorization , deleteUser)



export default router