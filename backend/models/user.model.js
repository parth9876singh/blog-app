import mongoose from "mongoose";
import validator from "validator";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid email"],
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    photo:{
        public_id:{
            type:String,
            default:"default.jpg",
            required:true,

        },
        url:{
            type:String,
            required:true,
        }
    },
    education:{
        type:String,
        required:true,  

    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        default: []
    }],
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:8,

    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationToken: {
        type: String,
    },
    emailVerificationExpires: {
        type: Date,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }    

});

export const User = mongoose.model("User",userSchema);       //to create collection