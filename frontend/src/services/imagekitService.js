export const imagekitService = {
  // Generate AI image based on blog content
  generateAIImage: async (title, category, description) => {
    try {
      const prompt = `Create a professional blog header image for: "${title}" in the ${category} category. 
      Description: ${description}
      Style: Modern, clean, professional, suitable for blog header
      Dimensions: 1200x630 pixels
      Colors: Professional color scheme
      No text overlay needed`;
      
      const response = await fetch('http://localhost:4001/api/imagekit/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          prompt,
          title,
          category
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate AI image');
      }
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error generating AI image:', error);
      throw new Error('Failed to generate AI image');
    }
  },

  // Edit image using AI
  editImage: async (imageUrl, editInstructions) => {
    try {
      const response = await fetch('http://localhost:4001/api/imagekit/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          imageUrl,
          instructions: editInstructions
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to edit image');
      }
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error editing image:', error);
      throw new Error('Failed to edit image');
    }
  },

  // Generate image variations
  generateImageVariations: async (imageUrl, count = 3) => {
    try {
      const response = await fetch('http://localhost:4001/api/imagekit/variations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          imageUrl,
          count
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate image variations');
      }
      
      const data = await response.json();
      return data.variations;
    } catch (error) {
      console.error('Error generating variations:', error);
      throw new Error('Failed to generate image variations');
    }
  },

  // Optimize image for web
  optimizeImage: async (imageUrl, options = {}) => {
    try {
      const { width, height, quality = 80, format = 'auto' } = options;
      
      let optimizedUrl = imageUrl;
      
      // Add ImageKit transformation parameters
      const transformations = [];
      
      if (width) transformations.push(`w-${width}`);
      if (height) transformations.push(`h-${height}`);
      if (quality) transformations.push(`q-${quality}`);
      if (format !== 'auto') transformations.push(`f-${format}`);
      
      if (transformations.length > 0) {
        optimizedUrl = `${imageUrl}?tr=${transformations.join(',')}`;
      }
      
      return optimizedUrl;
    } catch (error) {
      console.error('Error optimizing image:', error);
      throw new Error('Failed to optimize image');
    }
  },

  // Check if ImageKit is configured (always returns true since we use backend API)
  isConfigured: () => {
    return true;
  }
}; 