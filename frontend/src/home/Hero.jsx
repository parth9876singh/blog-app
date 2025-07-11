import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  const { blogs } = useAuth();
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate featured blogs
  useEffect(() => {
    if (blogs?.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(blogs.length, 3));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [blogs]);

  const featuredBlogs = blogs?.slice(0, 3) || [];

  const containerClasses = `relative min-h-screen pt-24 flex items-center justify-center overflow-hidden ${
    theme === "dark"
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
  } transition-colors duration-300`;

  const cardClasses = `
    group block overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl 
    transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]
    ${
      theme === "dark"
        ? "bg-gray-800/90 backdrop-blur-sm"
        : "bg-white/90 backdrop-blur-sm"
    }
  `;

  const borderClasses =
    theme === "dark" ? "border-gray-700" : "border-gray-100";

  return (
    <div className={containerClasses}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent`}
          >
            Discover Amazing Stories
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Explore thought-provoking content from passionate creators. From
            technology to spirituality, find stories that inspire and enlighten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blogs"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Blogs
            </Link>
            <Link
              to="/creators"
              className={`px-8 py-4 border-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                theme === "dark"
                  ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
              }`}
            >
              Meet Creators
            </Link>
          </div>
        </motion.div>

        {/* Featured Blogs Section */}
        {featuredBlogs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <h2
              className={`text-3xl font-bold text-center mb-12 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Featured Stories
            </h2>

            {/* Large Featured Blog */}
            <div className="mb-12">
              <Link
                to={`/blog/${featuredBlogs[currentSlide]?._id}`}
                className="block group"
              >
                <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={
                      featuredBlogs[currentSlide]?.blogImage?.url ||
                      "/placeholder.jpg"
                    }
                    alt={featuredBlogs[currentSlide]?.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center mb-4">
                      <span className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full">
                        {featuredBlogs[currentSlide]?.category || "Featured"}
                      </span>
                      <span
                        className={`ml-4 text-sm ${
                          theme === "dark" ? "text-gray-300" : "text-gray-200"
                        }`}
                      ></span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 line-clamp-2">
                      {featuredBlogs[currentSlide]?.title}
                    </h3>
                    <div className="flex items-center">
                      <img
                        src={
                          featuredBlogs[currentSlide]?.adminPhoto ||
                          "/avatar-placeholder.png"
                        }
                        alt={featuredBlogs[currentSlide]?.adminName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      />
                      <div className="ml-4">
                        <p className="text-white font-semibold">
                          {featuredBlogs[currentSlide]?.adminName ||
                            "Unknown Author"}
                        </p>
                        <p className="text-gray-300 text-sm">
                          Featured Creator
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Slide indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {featuredBlogs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-blue-500 scale-125"
                        : "bg-gray-400 hover:bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Recent Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs?.slice(3, 9).map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${blog._id}`} className={cardClasses}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.blogImage?.url || "/placeholder.jpg"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                        {blog.category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6">
                      <h3
                        className={`text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {blog.title}
                      </h3>

                      <p
                        className={`text-sm mb-4 line-clamp-3 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {blog.description ||
                          "Explore this fascinating story and discover new insights..."}
                      </p>

                      <div
                        className={`flex items-center justify-between pt-4 border-t ${borderClasses}`}
                      >
                        <div className="flex items-center">
                          <img
                            src={blog.adminPhoto || "/avatar-placeholder.png"}
                            alt={blog.adminName}
                            className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                          />
                          <div className="ml-3">
                            <p
                              className={`text-sm font-medium ${
                                theme === "dark"
                                  ? "text-gray-200"
                                  : "text-gray-900"
                              }`}
                            >
                              {blog.adminName || "Unknown Author"}
                            </p>
                            <p
                              className={`text-xs ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            ></p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            theme === "dark"
                              ? "bg-blue-900 text-blue-200"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          Read More
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <div
              className={`text-6xl mb-4 ${
                theme === "dark" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              📝
            </div>
            <p
              className={`text-xl ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No blog posts available yet. Be the first to share your story!
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center py-16"
        >
          <div
            className={`max-w-4xl mx-auto p-8 rounded-3xl ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-800 to-gray-700"
                : "bg-gradient-to-r from-blue-50 to-purple-50"
            } border border-gray-200 dark:border-gray-600`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Ready to Share Your Story?
            </h2>
            <p
              className={`text-lg mb-8 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join our community of creators and share your knowledge,
              experiences, and insights with the world.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Writing Today
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
