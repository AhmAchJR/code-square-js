import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config();

export const signJwt = (obj) => {
    return jwt.sign(obj, getSecretKey() , {expiresIn : 8600000})
};

export const verifyJwt = (token) => {
    return jwt.verify(token, getSecretKey())
};

const getSecretKey = () => {
    const secret = process.env.JWT_SECRET

    if (!secret) {
        console.error("Missing Jwt Secret")
        process.exit(1);
    }

    return secret;
};

// res.locals is an object in Express.js that provides a way to pass data from middleware to the view template. 
// It is an object that exists for the lifetime of the request,
// and its properties are local variables within the application's request-response cycle.
