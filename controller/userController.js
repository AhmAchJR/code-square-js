import userModel from "../models/userModel.js"
import DataStoreDao , {instance as dbInstance} from "../DAO/dataStoreDao.js"


export const createUser = async (req , res)=>{
    const {firstName , password , email}= req.body
    if(!password || !email || !firstName){
        return res.status(400).send("All Fields Are Required")
    }

    const newUser = req.body
    const savedUser = await dbInstance.createUser(newUser)
    return res.status(200).send(savedUser)
}

export const getUsers = async (req , res)=>{
        const allUsers = await dbInstance.getAllUsers()
        return res.status(200).send(allUsers)
        

}

export const deleteUser = (req , res)=> {}

export const updateUser = async (req , res)=>{
    const id = req.params.id
    const newUser = req.body

    if(!newUser){
        return res.status(400).send("New User Required")
    }

    const updatedUser = await dbInstance.updateUser(id , newUser)

    return res.status(201).send(updatedUser)
}

export const getUserById = async (req , res)=>{
    const id = req.params.id
    const user = await dbInstance.getUserById(id)
    return res.status(200).send(user)
}



