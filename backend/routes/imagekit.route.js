import express from "express";
import { isAuthenticated } from "../middleware/authUser.js";
import { generateAIImage, editImage, generateVariations } from "../controllers/imagekit.controller.js";

const router = express.Router();

// AI Image Generation
router.post("/generate", isAuthenticated, generateAIImage);

// AI Image Editing
router.post("/edit", isAuthenticated, editImage);

// Generate Image Variations
router.post("/variations", isAuthenticated, generateVariations);

export default router; 