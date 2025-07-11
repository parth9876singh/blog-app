import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TitleSuggestions = ({ suggestions, onSelectTitle, onClose }) => {
  const { theme } = useTheme();

  const containerClasses = `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-colors duration-300 ${
    theme === "dark" ? "text-white" : "text-gray-800"
  }`;

  const modalClasses = `max-w-md w-full mx-4 p-6 rounded-lg shadow-2xl transition-colors duration-300 ${
    theme === "dark" 
      ? "bg-gray-800 border-gray-700" 
      : "bg-white border-gray-200"
  } border`;

  const titleClasses = `text-lg font-semibold mb-4 ${
    theme === "dark" ? "text-white" : "text-gray-800"
  }`;

  const suggestionClasses = `p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-50 hover:border-blue-300 ${
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
      : "bg-gray-50 border-gray-200 text-gray-800"
  } border mb-2`;

  const closeButtonClasses = `absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
    theme === "dark"
      ? "hover:bg-gray-700 text-gray-400"
      : "hover:bg-gray-100 text-gray-600"
  }`;

  const handleTitleSelect = (title) => {
    onSelectTitle(title);
    onClose();
  };

  return (
    <div className={containerClasses} onClick={onClose}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className={closeButtonClasses}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <h3 className={titleClasses}>
          AI-Generated Title Suggestions
        </h3>

        <div className="space-y-2">
          {suggestions.map((title, index) => (
            <div
              key={index}
              className={suggestionClasses}
              onClick={() => handleTitleSelect(title)}
            >
              <p className="text-sm leading-relaxed">{title}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Click on any title to select it, or close to keep your current title
          </p>
        </div>
      </div>
    </div>
  );
};

export default TitleSuggestions; 