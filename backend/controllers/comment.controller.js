import Comment from '../models/comment.model.js';

// Add a comment to a blog
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;
    const userId = req.user._id; // Assumes auth middleware sets req.user

    const comment = new Comment({
      content,
      user: userId,
      blog: blogId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all comments for a blog
export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId })
      .populate('user', 'email')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
