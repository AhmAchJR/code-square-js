import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // photo: { type: String },
    firstName: { type: String, require: true, maxLength: 50, minLength: 2 },
    // lastName: { type: String, require: true, maxLength: 10, minLength: 2 },
    // dateOfBirth: {
    //     type: Date,
    //     required: true,
    // }, //match DD/MM/YYYY
    password: {
        type: String,
        required: true,
       // match: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    }, // match Minimum eight characters, at least one letter and one number:
    // confirmPassword: { type: String, required: true }, // check the same password
    email: { type: String, required: true}, // match   example mmmmm@gmail.com
    token: { type: String },
    role: {
        type: String,
        enum: ["admin", "student"],
        default: "student",
    },

    posts : [{type : mongoose.Schema.Types.ObjectId , ref : "posts"}]
  }); //schema


const userModel = mongoose.model("users" , userSchema)

export default userModel