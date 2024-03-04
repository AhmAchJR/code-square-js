import { verifyJwt } from "../server/auth.js"
import { instance as dbInstance } from "../DAO/dataStoreDao.js"

const authorization = async(req , res , next)=>{
    const token = req.headers["x-auth-token"]

    if(!token){
        return res.status(401).send("You Need Token")
    }

    const decodedPayload = verifyJwt(token)

    const user = await dbInstance.getUserById(decodedPayload.userId)

    if(!user){
        return res.status(400).send("User Not Exist")
    }

    if(decodedPayload.role === "admin"){
        next()
    }

    return res.status(401).send("You Are Not Authorized")
}

export default authorization