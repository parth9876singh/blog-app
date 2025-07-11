import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js'
import blogRoute from './routes/blog.route.js'
import imagekitRoute from './routes/imagekit.route.js'
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from "cors";
import commentRoute from './routes/comment.route.js'

dotenv.config();
const app = express()
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

    //Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://blog-app-tc0o.onrender.com",
  credentials: true,
  methods:["GET","PUT","POST","DELETE"],
}));
    // File-upload middleware code 
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, 
    useTempFiles:true,
    tempFileDir: "/tmp/",

}))    

    //DB Code
    try{
        mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB')
    }catch(error){
        console.log(error);
    }    


    // Define routes
app.use("/api/users",userRoute);    
app.use("/api/blogs",blogRoute);    
app.use("/api/imagekit", imagekitRoute);
app.use("/api/comments", commentRoute);
    
    //Cloudnary code
cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET_KEY, 
});



app.listen(port, () => {
  console.log(`Server is run on port ${port}`)
})