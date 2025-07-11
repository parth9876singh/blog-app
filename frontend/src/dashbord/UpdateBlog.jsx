import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import AIAssistant from "../components/AIAssistant";
import TitleSuggestions from "../components/TitleSuggestions";
import ImageEditor from "../components/ImageEditor";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const { theme } = useTheme();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [blogContent, setBlogContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Theme-based classes
  const containerClasses = `min-h-screen py-24 px-36 transition-colors duration-300 ${
    theme === "dark" ? "bg-gray-900" : "bg-gray-50"
  }`;

  const formContainerClasses = `max-w-2xl mx-auto p-6 rounded-lg shadow-2xl transition-colors duration-300 ${
    theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
  } border ml-0 md:ml-64`;

  const inputClasses = `w-full px-3 py-2 rounded-md outline-none transition-colors duration-200 ${
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
      : "bg-white border-gray-300 text-gray-800 focus:border-blue-500"
  } border`;

  const labelClasses = `block mb-1 text-sm font-medium ${
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  }`;

  const buttonClasses = `w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
    theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white"
  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`;

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

  useEffect(() => {
    const fetchBlog = async () => {
      setIsFetching(true);
      try {
        const { data } = await axios.get(
          `https://blog-app-tc0o.onrender.com/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );
        setTitle(data?.blog?.title);
        setCategory(data?.blog?.category);
        setAbout(data?.blog?.about);
        setBlogImage(data?.blog?.blogImage?.url);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch blog data");
      } finally {
        setIsFetching(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if (blogImage instanceof File) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `https://blog-app-tc0o.onrender.com/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Please fill all required fields"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner while fetching blog data
  if (isFetching) {
    return (
      <div className={containerClasses}>
        <div className={formContainerClasses}>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className={`ml-3 text-lg ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}>
              Loading blog data...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className={formContainerClasses}>
        <h3 className={`text-xl font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
          Update Blog
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
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className={labelClasses}>Category</label>
            <select
              className={inputClasses}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Title</label>
            <input
              type="text"
              placeholder="Enter blog title"
              className={inputClasses}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Blog Image</label>
            <div className="mb-2">
              <img
                src={blogImagePreview || blogImage || "/imgPL.webp"}
                alt="Blog preview"
                className="w-full h-40 object-cover rounded-md border"
              />
            </div>
            <input
              type="file"
              className={`${inputClasses} p-1 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 ${
                theme === "dark"
                  ? "file:bg-gray-600 file:text-white"
                  : "file:bg-gray-200 file:text-gray-700"
              }`}
              onChange={changePhotoHandler}
              accept="image/*"
            />
            
            {/* Image Editor */}
            {(blogImagePreview || blogImage) && (
              <div className="mt-4">
                <ImageEditor
                  imageUrl={blogImagePreview || blogImage}
                  onImageUpdated={handleImageUpdated}
                />
              </div>
            )}
          </div>

          <div>
            <label className={labelClasses}>About</label>
            <textarea
              rows="5"
              placeholder="Write something about your blog"
              className={inputClasses}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />
          </div>

          {blogContent && (
            <div>
              <label className={labelClasses}>Blog Content (AI Generated)</label>
              <textarea
                rows="8"
                placeholder="AI-generated blog content will appear here"
                className={inputClasses}
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                readOnly
              />
              <p className={`text-sm mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                This is AI-generated content. You can copy and use it as a starting point for your blog.
              </p>
            </div>
          )}

          <button type="submit" className={buttonClasses} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating Blog...
              </div>
            ) : (
              "Update Blog"
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

export default UpdateBlog;