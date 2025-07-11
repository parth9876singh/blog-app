import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function MyBlogs() {
  const [blog, setBlog] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/my-blog",
          { withCredentials: true }
        );
        setBlog(data.myBlogs);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch your blogs");
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4001/api/blogs/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message || "Blog deleted successfully");
      setBlog((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  // Theme-based classes
  const containerClasses = `min-h-screen transition-all duration-300 ${
    theme === "dark" ? "bg-gray-900" : "bg-gray-50"
  }`;

  const contentClasses = `container mx-auto py-12 px-4 sm:px-6 transition-colors duration-300 ml-0 md:ml-64`;

  const cardClasses = `rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
    theme === "dark" ? "bg-gray-800" : "bg-white"
  }`;

  const textClasses = {
    title: theme === "dark" ? "text-white" : "text-gray-900",
    category: theme === "dark" ? "text-gray-400" : "text-gray-600",
    empty: theme === "dark" ? "text-gray-400" : "text-gray-500",
  };

  const buttonClasses = (color) => `
    rounded-md px-4 py-2 font-medium transition-colors duration-200
    ${theme === "dark" 
      ? `bg-gray-700 text-${color}-400 hover:bg-gray-600` 
      : `bg-white text-${color}-600 hover:bg-gray-100`
    }
    border ${theme === "dark" ? "border-gray-600" : "border-gray-300"}
  `;

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <h1 className={`text-3xl font-bold mb-8 ${textClasses.title}`}>
          My Blogs
        </h1>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blog?.length > 0 ? (
            blog.map((blog) => (
              <div className={cardClasses} key={blog._id}>
                <img
                  src={blog?.blogImage?.url || "/placeholder-blog.jpg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className={`text-sm ${textClasses.category}`}>
                    {blog.category}
                  </span>
                  <h3 className={`text-xl font-semibold mt-2 mb-4 ${textClasses.title}`}>
                    {blog.title}
                  </h3>
                  <div className="flex justify-between">
                    <Link
                      to={`/blog/update/${blog._id}`}
                      className={buttonClasses("blue")}
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className={buttonClasses("red")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className={`text-lg ${textClasses.empty}`}>
                You havent posted any blogs yet!
              </p>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;