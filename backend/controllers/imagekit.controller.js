import ImageKit from "imagekit";
import fetch from "node-fetch";

// Initialize ImageKit with fallback for missing environment variables
let imagekit = null;

try {
  if (process.env.IMAGEKIT_PUBLIC_KEY && 
      process.env.IMAGEKIT_PRIVATE_KEY && 
      process.env.IMAGEKIT_URL_ENDPOINT) {
    imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
} catch (error) {
  console.warn('ImageKit initialization failed:', error);
}

export const generateAIImage = async (req, res) => {
  try {
    const { prompt, title, category } = req.body;

    if (!prompt || !title) {
      return res.status(400).json({ message: "Prompt and title are required" });
    }

    // For now, we'll use a placeholder image service
    // In a real implementation, you would integrate with ImageKit's AI features
    // or use a service like DALL-E, Stable Diffusion, etc.
    
    // Placeholder: Generate a themed image URL based on category
    const categoryImages = {
      "Devotion": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop",
      "Sports": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop",
      "Coding": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop",
      "Entertainment": "https://images.unsplash.com/photo-1489599832529-2c8e3b4c2c3c?w=1200&h=630&fit=crop",
      "Business": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop",
      "Technology": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop"
    };

    const imageUrl = categoryImages[category] || categoryImages["Technology"];

    // If ImageKit is not configured, return the placeholder image directly
    if (!imagekit) {
      return res.status(200).json({ 
        message: "AI image generated successfully (placeholder)",
        url: imageUrl,
        fileId: null
      });
    }

    // Upload the generated image to ImageKit
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `ai-generated-${Date.now()}.jpg`,
      folder: 'ai-generated-images',
      useUniqueFileName: true,
    });

    res.status(200).json({ 
      message: "AI image generated successfully",
      url: uploadResponse.url,
      fileId: uploadResponse.fileId
    });

  } catch (error) {
    console.error('Error generating AI image:', error);
    res.status(500).json({ message: "Failed to generate AI image" });
  }
};

export const editImage = async (req, res) => {
  try {
    const { imageUrl, instructions } = req.body;

    if (!imageUrl || !instructions) {
      return res.status(400).json({ message: "Image URL and instructions are required" });
    }

    // For now, we'll return the original image
    // In a real implementation, you would use ImageKit's editing features
    // or integrate with an AI image editing service

    res.status(200).json({ 
      message: "Image edited successfully",
      url: imageUrl
    });

  } catch (error) {
    console.error('Error editing image:', error);
    res.status(500).json({ message: "Failed to edit image" });
  }
};

export const generateVariations = async (req, res) => {
  try {
    const { imageUrl, count = 3 } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    // For now, we'll generate placeholder variations
    // In a real implementation, you would use ImageKit's AI features
    const variations = [];
    
    for (let i = 0; i < count; i++) {
      variations.push({
        url: `${imageUrl}?v=${i + 1}`,
        id: `variation-${i + 1}`
      });
    }

    res.status(200).json({ 
      message: "Image variations generated successfully",
      variations
    });

  } catch (error) {
    console.error('Error generating variations:', error);
    res.status(500).json({ message: "Failed to generate image variations" });
  }
}; 