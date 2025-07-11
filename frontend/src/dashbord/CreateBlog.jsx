import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import AIAssistant from "../components/AIAssistant";
import TitleSuggestions from "../components/TitleSuggestions";
import ImageEditor from "../components/ImageEditor";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [blogContent, setBlogContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  // AI Assistant handlers
  const handleTitleGenerated = (titles) => {
    setTitleSuggestions(titles);
    setShowTitleSuggestions(true);
  };

  const handleDescriptionGenerated = (description) => {
    setAbout(description);
  };

  const handleImageGenerated = (imageUrl) => {
    setBlogImagePreview(imageUrl);
    // Convert URL to file object for form submission
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'ai-generated-image.jpg', { type: 'image/jpeg' });
        setBlogImage(file);
      });
  };

  const handleContentGenerated = (content) => {
    setBlogContent(content);
  };

  const handleSelectTitle = (selectedTitle) => {
    setTitle(selectedTitle);
  };

  const handleImageUpdated = (newImageUrl) => {
    setBlogImagePreview(newImageUrl);
    // Convert URL to file object for form submission
    fetch(newImageUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'edited-image.jpg', { type: 'image/jpeg' });
        setBlogImage(file);
      });
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        "https://blog-app-tc0o.onrender.com/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Please fill all required fields");
    } finally {
      setIsLoading(false);
    }
  };

  // Theme-based classes
  const containerClasses = `min-h-screen py-10 transition-colors duration-300 ${
    theme === "dark" ? "bg-gray-900" : "bg-gray-50"
  }`;
  
  const formContainerClasses = `max-w-4xl mx-auto p-6 rounded-lg shadow-2xl transition-colors duration-300 ${
    theme === "dark" 
      ? "bg-gray-800 border-gray-700" 
      : "bg-white border-gray-200"
  } border`;
  
  const inputClasses = `w-full px-4 py-3 rounded-lg outline-none transition-colors duration-200 ${
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
      : "bg-white border-gray-300 text-gray-800 focus:border-blue-500"
  } border`;
  
  const labelClasses = `block text-lg font-medium ${
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  }`;
  
  const buttonClasses = `w-full py-3 px-4 rounded-2xl font-medium transition-colors duration-200 ${
    theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white"
  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div className={containerClasses}>
      <div className={formContainerClasses}>
        <h3 className={`text-2xl font-semibold mb-8 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
          Create Blog
        </h3>
        
        {/* AI Assistant */}
        <div className="mb-6">
          <AIAssistant
            onTitleGenerated={handleTitleGenerated}
            onDescriptionGenerated={handleDescriptionGenerated}
            onImageGenerated={handleImageGenerated}
            onContentGenerated={handleContentGenerated}
            category={category}
            currentTitle={title}
            currentDescription={about}
          />
        </div>
        
        <form onSubmit={handleCreateBlog} className="space-y-6">
          <div className="space-y-3">
            <label className={labelClasses}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClasses}
              required
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Technology">Technology</option>
              <option value="Food & Recipes">Food & Recipes</option>
              <option value="Photography">Photography</option>
              <option value="Science & Space">Science & Space</option>
              <option value="Gaming">Gaming</option>
              <option value="DIY & Crafts">DIY & Crafts</option>
              <option value="Culture & Traditions">Culture & Traditions</option>
              <option value="TechnolFitness & Wellnessogy">Fitness & Wellness</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className={labelClasses}>Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div className="space-y-3">
            <label className={labelClasses}>Blog Image</label>
            <div className="flex items-center justify-center mb-3">
              <img
                src={blogImagePreview || "/imgPL.webp"}
                alt="Blog preview"
                className="w-full max-w-sm h-64 rounded-md object-cover border"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className={`${inputClasses} p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                theme === "dark"
                  ? "file:bg-gray-600 file:text-white"
                  : "file:bg-gray-200 file:text-gray-700"
              }`}
              accept="image/*"
              required={!blogImagePreview}
            />
            
            {/* Image Editor */}
            {blogImagePreview && (
              <div className="mt-4">
                <ImageEditor
                  imageUrl={blogImagePreview}
                  onImageUpdated={handleImageUpdated}
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className={labelClasses}>About</label>
            <textarea
              rows="6"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          {blogContent && (
            <div className="space-y-3">
              <label className={labelClasses}>Blog Content (AI Generated)</label>
              <textarea
                rows="12"
                placeholder="AI-generated blog content will appear here"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                className={inputClasses}
                readOnly
              />
              <p className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                This is AI-generated content. You can copy and use it as a starting point for your blog.
              </p>
            </div>
          )}

          <button
            type="submit"
            className={buttonClasses}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Blog...
              </div>
            ) : (
              "Post Blog"
            )}
          </button>
        </form>
      </div>

      {/* Title Suggestions Modal */}
      {showTitleSuggestions && (
        <TitleSuggestions
          suggestions={titleSuggestions}
          onSelectTitle={handleSelectTitle}
          onClose={() => setShowTitleSuggestions(false)}
        />
      )}
    </div>
  );
}

export default CreateBlog;