import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import cloudinary from "cloudinary";


export const createBlog = async (req, res) => {

    try{
        //to check the photo is upload or not
    if(!req.files || Object.keys(req.files).length==0){
        return res.status(400).json({message: "Please upload Blog photo!"});
    }
    //photo send from files
    const {blogImage} = req.files;
    //format of photo given
    const allowformat = ["image/jpeg","image/png"];
    //check the photo format
    if(!allowformat.includes(blogImage.mimetype)){
        return res.status(400).json({message: "Please upload photo in jpg or png format"});
    }




  const { title,category,about } = req.body;
  if (!title || !category || !about) {
    return res.status(400).json({ message: "All fields are required" });
  }

   const adminPhoto = req?.user?.photo?.url;
   const adminName = req?.user?.name;
    const createdBy = req?.user?._id;

  //take photo from cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
  if(!cloudinaryResponse || cloudinaryResponse.error){
    return res.status(400).json({message: "Failed to upload photo!"});
  }


  const blogData ={
    title,
    about,
    category,
    adminName,
    adminPhoto,
    createdBy,
    blogImage:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url
    }
  };

  const blog=await Blog.create(blogData);
 
    res.status(201).json({ message: "Blog created successfully" ,blog});
   

    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
};


export const deleteBlog = async(req,res)=>{
  try{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
      return res.status(404).json({message:"Blog not found"});
    }
    await blog.deleteOne();
    return res.status(200).json({message:"Blog deleted successfully"});

  }catch(error){
    return res.status(500).json({message:"Internal server error"})
  }
}


export const getAllBlog = async(req,res)=>{
  try{
    const { search, category, author } = req.query;
    
    // Build filter object
    let filter = {};
    
    // Search by title or content
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { about: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    // Filter by author name
    if (author) {
      filter.adminName = { $regex: author, $options: 'i' };
    }
    
    const allBlogs = await Blog.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({message:"All blogs",allBlogs});

  }catch(error){
    return res.status(500).json({message:"Getting all Blogs server error"})
  }
}


export const getSingleBlog = async(req,res)=>{
  try{
      const {id} = req.params;
      const blog = await Blog.findById(id); 
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"Invalid Blog Id!"});
      }
      if(!blog){
        return res.status(404).json({message:"Blog not found"});
      }
      return res.status(200).json({message:"Blog found",blog});
  }catch(error){
    return res.status(500).json({message:"Getting single blog server error"})
  }
}


export const myBlog = async(req,res)=>{
  try{
    const {id} = req.user;
    const myBlogs = await Blog.find({createdBy:id});
    return res.status(200).json({message:"Your blogs",myBlogs});
  }catch(error){
    return res.status(500).json({message:"Getting my blog server error"})
  }
}


export const updateBlog = async(req,res)=>{
  try{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({message:"Invalid Blog Id!"});
    }
    
    const updateBlog = await Blog.findByIdAndUpdate(id,req.body,{new:true});
      if(!updateBlog){
        return res.status(404).json({message:"Blog not found"});
      }
        return res.status(200).json({message:"Blog updated",updateBlog});
        
  }catch(error){
    return res.status(500).json({message:"Updating blog server error"})
  }
}

// Like/Unlike a blog
export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    const isLiked = blog.likes.includes(userId);
    if (isLiked) {
      // Unlike: remove user from likes array
      blog.likes = blog.likes.filter(likeId => likeId.toString() !== userId.toString());
    } else {
      // Like: add user to likes array
      blog.likes.push(userId);
    }
    
    await blog.save();
    res.json({ 
      message: isLiked ? 'Blog unliked' : 'Blog liked',
      likes: blog.likes.length,
      isLiked: !isLiked
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};