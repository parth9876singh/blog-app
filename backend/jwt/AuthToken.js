import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';


const createTokenAndSaveCookies = async (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn: "7d"})
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:true,
        sameSite:"None",
        path: "/", 
    })
    await User.findByIdAndUpdate(userId,{token});
    return token;

}

export default createTokenAndSaveCookies;


