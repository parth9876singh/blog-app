import React, { useState } from 'react';
import { imagekitService } from '../services/imagekitService';
import { useTheme } from '../context/ThemeContext';
import { PhotoIcon, SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ImageEditor = ({ imageUrl, onImageUpdated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editInstructions, setEditInstructions] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const { theme } = useTheme();

  const containerClasses = `p-4 rounded-lg border transition-colors duration-300 ${
    theme === "dark" 
      ? "bg-gray-800 border-gray-700" 
      : "bg-white border-gray-200"
  }`;

  const inputClasses = `w-full px-3 py-2 rounded-lg outline-none transition-colors duration-200 ${
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
      : "bg-white border-gray-300 text-gray-800 focus:border-blue-500"
  } border`;

  const buttonClasses = `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
    theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white"
  }`;

  const handleEditImage = async () => {
    if (!editInstructions.trim()) {
      toast.error('Please enter editing instructions');
      return;
    }

    setIsLoading(true);
    try {
      const editedImageUrl = await imagekitService.editImage(imageUrl, editInstructions);
      onImageUpdated(editedImageUrl);
      toast.success('Image edited successfully!');
      setEditInstructions('');
      setShowEditor(false);
    } catch (error) {
      toast.error('Failed to edit image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVariations = async () => {
    setIsLoading(true);
    try {
      const variations = await imagekitService.generateImageVariations(imageUrl, 3);
      // For now, just use the first variation
      if (variations && variations.length > 0) {
        onImageUpdated(variations[0].url);
        toast.success('Image variation generated!');
      }
    } catch (error) {
      toast.error('Failed to generate image variations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimizeImage = async () => {
    setIsLoading(true);
    try {
      const optimizedUrl = await imagekitService.optimizeImage(imageUrl, {
        width: 1200,
        height: 630,
        quality: 80
      });
      onImageUpdated(optimizedUrl);
      toast.success('Image optimized!');
    } catch (error) {
      toast.error('Failed to optimize image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-2 mb-4">
        <PhotoIcon className="w-5 h-5 text-blue-500" />
        <h3 className={`text-lg font-semibold ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
          Image Editor
        </h3>
      </div>

      <div className="space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGenerateVariations}
            disabled={isLoading}
            className={buttonClasses}
          >
            <ArrowPathIcon className="w-4 h-4" />
            {isLoading ? 'Generating...' : 'Variations'}
          </button>

          <button
            onClick={handleOptimizeImage}
            disabled={isLoading}
            className={buttonClasses}
          >
            <SparklesIcon className="w-4 h-4" />
            {isLoading ? 'Optimizing...' : 'Optimize'}
          </button>
        </div>

        {/* AI Edit */}
        <div>
          <button
            onClick={() => setShowEditor(!showEditor)}
            className={`w-full text-left p-3 rounded-lg border transition-colors duration-200 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                : "bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4" />
              <span>AI Edit Image</span>
            </div>
          </button>

          {showEditor && (
            <div className="mt-3 space-y-3">
              <textarea
                placeholder="Describe how you want to edit the image (e.g., 'Make it brighter', 'Add a sunset background', 'Change to black and white')"
                value={editInstructions}
                onChange={(e) => setEditInstructions(e.target.value)}
                className={`${inputClasses} resize-none`}
                rows="3"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditImage}
                  disabled={isLoading || !editInstructions.trim()}
                  className={buttonClasses}
                >
                  {isLoading ? 'Editing...' : 'Apply Edit'}
                </button>
                <button
                  onClick={() => setShowEditor(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-gray-600 hover:bg-gray-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Image Preview */}
        {imageUrl && (
          <div className="mt-4">
            <img
              src={imageUrl}
              alt="Blog preview"
              className="w-full h-32 object-cover rounded-lg border"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor; 