import express from 'express';
import { allAdmin, login, logout, myProfile, register, getCurrentUser, toggleFavorite, getUserFavorites, verifyEmail, resendVerificationEmail } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post("/register",register)

router.post("/login",login)
router.get("/logout",isAuthenticated,logout)
router.get("/my-profile",isAuthenticated,myProfile)
router.get("/admins",allAdmin);

// Email verification routes
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

// Add current user endpoint
router.get('/me', isAuthenticated, getCurrentUser);

// Add favorite/unfavorite endpoint
router.post('/favorites/:blogId', isAuthenticated, toggleFavorite);

// Get user's favorite blogs
router.get('/favorites', isAuthenticated, getUserFavorites);

export default router; 