import express from 'express';
import { addComment, getCommentsByBlog, deleteComment } from '../controllers/comment.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

// Add a comment to a blog
router.post('/:blogId', isAuthenticated, addComment);

// Get all comments for a blog
router.get('/:blogId', getCommentsByBlog);

// Delete a comment
router.delete('/:commentId', isAuthenticated, deleteComment);

export default router;
