import { signJwt  , verifyJwt} from "../server/auth.js"
import { instance as dbInstance } from "../DAO/dataStoreDao.js"
import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

export const signUp = async (req , res)=>{
    const user = req.body
    if(!user.email || !user.password || !user.firstName){
        return res.status(400).send("All Fields Are Required")
    }
    
    const existedUser = await dbInstance.getUserByEmail({email : user.email.toLowerCase()})

    if(existedUser){
        return res.status(400).send("User Already Exist")
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(user.password , salt)

    user.password = hashedPassword
    // user.email = user.email.toLowerCase()
    
    const savedUser = await dbInstance.createUser(user)
    return res.status(200).send(savedUser)
}

// LOGIN 

export const signIn = async (req, res) => {
    const user = req.body;

    if (!user.email || !user.password) {
        return res.status(400).send("Email and Password Required");
    }

    try {
        let existedUser = await dbInstance.getUserByEmail({ email: user.email.toLowerCase() })

        if (!existedUser) {
            return res.status(400).send("User Not Found")
        }


        
        if(await bcrypt.compare(user.password , existedUser.password)){
            const token = signJwt({ userId: existedUser._id, role: existedUser.role })
            existedUser.token = token
        
            // Save the updated user with the new token

            existedUser = await existedUser.save()

            return res.status(200).send(existedUser)
        }

        return res.status(400).send("Invalid Credentials")

    }catch (error) {
        // Handle any errors
        console.error("Error in sign-in:", error)
        return res.status(500).send("Internal Server Error")
    }
}