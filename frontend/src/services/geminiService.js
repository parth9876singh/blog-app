import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with fallback for missing environment variables
let genAI = null;

try {
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  }
} catch (error) {
  console.warn('Gemini AI initialization failed:', error);
}

export const geminiService = {
  // Generate blog title suggestions
  generateTitleSuggestions: async (category, topic) => {
    try {
      if (!genAI) {
        throw new Error('Gemini AI not configured. Please set up VITE_GEMINI_API_KEY environment variable.');
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Generate 5 engaging blog title suggestions for a ${category} blog about ${topic}. 
      Make them catchy, SEO-friendly, and under 60 characters. 
      Return only the titles, one per line, without numbering.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const titles = response.text().split('\n').filter(title => title.trim());
      
      return titles;
    } catch (error) {
      console.error('Error generating titles:', error);
      throw new Error('Failed to generate title suggestions');
    }
  },

  // Generate blog content outline
  generateContentOutline: async (title, category) => {
    try {
      if (!genAI) {
        throw new Error('Gemini AI not configured. Please set up VITE_GEMINI_API_KEY environment variable.');
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Create a detailed blog content outline for the title: "${title}" in the ${category} category.
      Include:
      1. Introduction (2-3 points)
      2. Main content sections (3-5 sections with 2-3 sub-points each)
      3. Conclusion (2-3 points)
      
      Format as a structured outline with clear sections.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return response.text();
    } catch (error) {
      console.error('Error generating outline:', error);
      throw new Error('Failed to generate content outline');
    }
  },

  // Generate blog description/about
  generateBlogDescription: async (title, category) => {
    try {
      if (!genAI) {
        throw new Error('Gemini AI not configured. Please set up VITE_GEMINI_API_KEY environment variable.');
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Write a compelling blog description (about 150-200 words) for a blog titled "${title}" in the ${category} category.
      Make it engaging, informative, and encourage readers to read the full blog.
      Focus on the value proposition and what readers will learn.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return response.text();
    } catch (error) {
      console.error('Error generating description:', error);
      throw new Error('Failed to generate blog description');
    }
  },

  // Generate complete blog content
  generateBlogContent: async (title, category, outline) => {
    try {
      if (!genAI) {
        throw new Error('Gemini AI not configured. Please set up VITE_GEMINI_API_KEY environment variable.');
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Write a complete blog post based on this title: "${title}" in the ${category} category.
      
      Use this outline as a guide:
      ${outline}
      
      Write a well-structured blog post with:
      - Engaging introduction
      - Clear sections with subheadings
      - Practical insights and examples
      - Professional tone
      - Around 800-1200 words
      - Proper formatting with paragraphs and bullet points where appropriate`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate blog content');
    }
  },

  // Generate SEO keywords
  generateSEOKeywords: async (title, category) => {
    try {
      if (!genAI) {
        throw new Error('Gemini AI not configured. Please set up VITE_GEMINI_API_KEY environment variable.');
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Generate 10 relevant SEO keywords for a blog titled "${title}" in the ${category} category.
      Include a mix of primary and long-tail keywords.
      Return only the keywords, separated by commas.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return response.text().split(',').map(keyword => keyword.trim());
    } catch (error) {
      console.error('Error generating keywords:', error);
      throw new Error('Failed to generate SEO keywords');
    }
  },

  // Check if Gemini AI is configured
  isConfigured: () => {
    return genAI !== null;
  }
}; 