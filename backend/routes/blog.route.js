import express from 'express';
import { createBlog, deleteBlog, getAllBlog, getSingleBlog, myBlog, updateBlog, toggleLike } from '../controllers/blog.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';



const router = express.Router();

router.post("/create",isAuthenticated,isAdmin("admin"),createBlog);
router.delete("/delete/:id",isAuthenticated,isAdmin("admin"),deleteBlog);
router.get("/all-blog",getAllBlog);
router.get("/single-blog/:id",isAuthenticated,getSingleBlog);
router.get("/my-blog",isAuthenticated,isAdmin("admin"),myBlog)
router.put("/update/:id",isAuthenticated,isAdmin("admin"),updateBlog)
router.post("/:id/like", isAuthenticated, toggleLike);


export default router; 