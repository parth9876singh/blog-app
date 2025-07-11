import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";

const CommentForm = ({ blogId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4001/api'}/comments/${blogId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include',
        },
        credentials: 'include',
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      setContent('');
      onCommentAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Theme-based classes
  const containerClasses = `rounded-xl p-4 transition-colors duration-300 ${
    theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
  }`;
  
  const textareaClasses = `w-full px-4 py-3 rounded-lg outline-none transition-all duration-200 ${
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
      : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
  } border resize-none`;
  
  const buttonClasses = `px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
    theme === "dark"
      ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-md hover:shadow-lg"
      : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md hover:shadow-lg"
  } ${(loading || !content.trim()) ? "opacity-50 cursor-not-allowed" : ""}`;
  
  const errorClasses = `text-sm mt-2 px-3 py-2 rounded-lg ${
    theme === "dark" ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-700"
  }`;

  return (
    <div className={containerClasses}>
      <h4 className={`text-lg font-semibold mb-3 ${
        theme === "dark" ? "text-gray-200" : "text-gray-700"
      }`}>
        Leave a comment
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            className={textareaClasses}
            rows={3}
            placeholder="Share your thoughts..."
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            disabled={loading}
          />
          <div className={`absolute bottom-3 right-3 text-xs ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}>
            {content.length}/500
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className={`p-2 rounded-full ${
                theme === "dark" 
                  ? "text-gray-400 hover:bg-gray-700" 
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              title="Add emoji"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              type="button"
              className={`p-2 rounded-full ${
                theme === "dark" 
                  ? "text-gray-400 hover:bg-gray-700" 
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              title="Attach image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          
          <button 
            type="submit" 
            className={buttonClasses}
            disabled={loading || !content.trim()}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </span>
            ) : (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Post Comment
              </span>
            )}
          </button>
        </div>
        
        {error && (
          <div className={errorClasses}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentForm;