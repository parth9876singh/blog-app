import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";
// IN Middleware we use next

// Authentication Code --- to check blog will be created when user or admin logged in, without loggin no blog created
export const isAuthenticated = async (req, res, next) =>{
    try{
        const token = req.cookies.jwt; // get token from cookies
        console.log("cookies token: ", token);
        if(!token) {
            return res.status(401).json({error: "You must be logged"})
        }
            // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({error: "User not found"});
        }
        req.user = user;
        next();
    }catch(error){
        console.log("Error occuring in authentication");
        return res.status(401).json({message: "User Authentication failed!"});
    }
}






//Authorization Code --- to check the user is Admin or not if Admin then can CRUD the blog otherwise only can read the blog

export const isAdmin =  (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error: "You are not authorized to perform this action"})
        };
        next();
    };
};
