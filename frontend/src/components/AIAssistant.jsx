import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { imagekitService } from '../services/imagekitService';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { SparklesIcon, PhotoIcon, DocumentTextIcon, LightBulbIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AIAssistant = ({ 
  onTitleGenerated, 
  onDescriptionGenerated, 
  onImageGenerated, 
  onContentGenerated,
  category,
  currentTitle = '',
  currentDescription = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const { theme } = useTheme();

  // Check if services are configured
  const isGeminiConfigured = geminiService.isConfigured();
  const isImageKitConfigured = imagekitService.isConfigured();

  const containerClasses = `p-4 rounded-lg border transition-colors duration-300 ${
    theme === "dark" 
      ? "bg-gray-800 border-gray-700" 
      : "bg-white border-gray-200"
  }`;

  const buttonClasses = `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
    theme === "dark"
      ? "bg-gray-700 hover:bg-gray-600 text-white"
      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
  }`;

  const loadingButtonClasses = `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
    theme === "dark"
      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
      : "bg-gray-200 text-gray-500 cursor-not-allowed"
  }`;

  const handleGenerateTitles = async () => {
    if (!category) {
      toast.error('Please select a category first');
      return;
    }

    setIsLoading(true);
    setActiveFeature('titles');
    
    try {
      const topic = currentTitle || 'general topics';
      const titles = await geminiService.generateTitleSuggestions(category, topic);
      onTitleGenerated(titles);
      toast.success('Title suggestions generated!');
    } catch (error) {
      toast.error('Failed to generate title suggestions');
    } finally {
      setIsLoading(false);
      setActiveFeature(null);
    }
  };

  const handleGenerateDescription = async () => {
    if (!currentTitle) {
      toast.error('Please enter a title first');
      return;
    }

    setIsLoading(true);
    setActiveFeature('description');
    
    try {
      const description = await geminiService.generateBlogDescription(currentTitle, category);
      onDescriptionGenerated(description);
      toast.success('Description generated!');
    } catch (error) {
      toast.error('Failed to generate description');
    } finally {
      setIsLoading(false);
      setActiveFeature(null);
    }
  };

  const handleGenerateImage = async () => {
    if (!currentTitle) {
      toast.error('Please enter a title first');
      return;
    }

    setIsLoading(true);
    setActiveFeature('image');
    
    try {
      const imageUrl = await imagekitService.generateAIImage(
        currentTitle, 
        category, 
        currentDescription
      );
      onImageGenerated(imageUrl);
      toast.success('AI image generated!');
    } catch (error) {
      toast.error('Failed to generate AI image');
    } finally {
      setIsLoading(false);
      setActiveFeature(null);
    }
  };

  const handleGenerateContent = async () => {
    if (!currentTitle) {
      toast.error('Please enter a title first');
      return;
    }

    setIsLoading(true);
    setActiveFeature('content');
    
    try {
      // First generate outline
      const outline = await geminiService.generateContentOutline(currentTitle, category);
      
      // Then generate full content
      const content = await geminiService.generateBlogContent(currentTitle, category, outline);
      onContentGenerated(content);
      toast.success('Blog content generated!');
    } catch (error) {
      toast.error('Failed to generate blog content');
    } finally {
      setIsLoading(false);
      setActiveFeature(null);
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-2 mb-4">
        <SparklesIcon className="w-5 h-5 text-blue-500" />
        <h3 className={`text-lg font-semibold ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
          AI Assistant
        </h3>
      </div>

      {/* Configuration Warning */}
      {(!isGeminiConfigured || !isImageKitConfigured) && (
        <div className="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                AI Services Not Configured
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                {!isGeminiConfigured && "• Gemini AI API key missing"}
                {!isGeminiConfigured && !isImageKitConfigured && " • "}
                {!isImageKitConfigured && "• ImageKit credentials missing"}
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Please check the AI_INTEGRATION_SETUP.md file for setup instructions.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleGenerateTitles}
          disabled={isLoading || !isGeminiConfigured}
          className={isLoading && activeFeature === 'titles' ? loadingButtonClasses : buttonClasses}
        >
          <LightBulbIcon className="w-4 h-4" />
          {isLoading && activeFeature === 'titles' ? 'Generating...' : 'Title Ideas'}
        </button>

        <button
          onClick={handleGenerateDescription}
          disabled={isLoading || !currentTitle || !isGeminiConfigured}
          className={isLoading && activeFeature === 'description' ? loadingButtonClasses : buttonClasses}
        >
          <DocumentTextIcon className="w-4 h-4" />
          {isLoading && activeFeature === 'description' ? 'Generating...' : 'Description'}
        </button>

        <button
          onClick={handleGenerateImage}
          disabled={isLoading || !currentTitle || !isImageKitConfigured}
          className={isLoading && activeFeature === 'image' ? loadingButtonClasses : buttonClasses}
        >
          <PhotoIcon className="w-4 h-4" />
          {isLoading && activeFeature === 'image' ? 'Generating...' : 'AI Image'}
        </button>

        <button
          onClick={handleGenerateContent}
          disabled={isLoading || !currentTitle || !isGeminiConfigured}
          className={isLoading && activeFeature === 'content' ? loadingButtonClasses : buttonClasses}
        >
          <DocumentTextIcon className="w-4 h-4" />
          {isLoading && activeFeature === 'content' ? 'Generating...' : 'Full Content'}
        </button>
      </div>

      {isLoading && (
        <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-sm text-blue-700">
              {activeFeature === 'titles' && 'Generating title suggestions...'}
              {activeFeature === 'description' && 'Generating blog description...'}
              {activeFeature === 'image' && 'Generating AI image...'}
              {activeFeature === 'content' && 'Generating blog content...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant; 