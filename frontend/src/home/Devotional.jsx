import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Devotional = () => {
  const { blogs } = useAuth();
  const { theme } = useTheme();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");

  const containerClasses = `py-20 ${
    theme === "dark"
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      : "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
  } transition-colors duration-300`;
  const cardClasses = `
    group block overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl 
    transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]
    ${
      theme === "dark"
        ? "bg-gray-800/90 backdrop-blur-sm"
        : "bg-white/90 backdrop-blur-sm"
    }
    border border-gray-200 dark:border-gray-700
  `;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className={containerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div
              className={`text-4xl mr-4 ${
                theme === "dark" ? "text-yellow-400" : "text-amber-500"
              }`}
            >
              🙏
            </div>
            <h2
              className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent`}
            >
              Spiritual Insights
            </h2>
            <div
              className={`text-4xl ml-4 ${
                theme === "dark" ? "text-yellow-400" : "text-amber-500"
              }`}
            >
              ✨
            </div>
          </div>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover wisdom, faith, and spiritual guidance through our
            collection of devotional content
          </p>
        </motion.div>

        {devotionalBlogs?.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {devotionalBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/blog/${blog._id}`} className={cardClasses}>
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={blog?.blogImage?.url || "/placeholder.jpg"}
                        alt={blog?.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold rounded-full shadow-lg">
                        Devotion
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Hover overlay with read more */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-semibold text-sm">
                          Read Wisdom →
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3
                        className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors duration-300 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {blog?.title}
                      </h3>

                      <p
                        className={`text-sm mb-4 line-clamp-3 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {blog?.description ||
                          "Discover spiritual insights and wisdom that will inspire and guide your journey..."}
                      </p>

                      <div
                        className={`flex items-center justify-between pt-4 border-t ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-100"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <img
                              src={
                                blog?.adminPhoto || "/avatar-placeholder.png"
                              }
                              alt={blog?.adminName}
                              className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="ml-3">
                            <p
                              className={`text-sm font-semibold ${
                                theme === "dark"
                                  ? "text-gray-200"
                                  : "text-gray-900"
                              }`}
                            >
                              {blog?.adminName || "Unknown Author"}
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
                              ? "bg-amber-900/50 text-amber-200"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          Spiritual
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
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div
              className={`text-6xl mb-4 ${
                theme === "dark" ? "text-yellow-400" : "text-amber-500"
              }`}
            >
              🙏✨
            </div>
            <p
              className={`text-xl ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No devotional posts yet. Share your spiritual wisdom and inspire
              others!
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div
            className={`max-w-4xl mx-auto p-8 rounded-3xl ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-800 to-gray-700"
                : "bg-gradient-to-r from-amber-50 to-orange-50"
            } border border-gray-200 dark:border-gray-600`}
          >
            <h3
              className={`text-2xl md:text-3xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Share Your Spiritual Journey
            </h3>
            <p
              className={`text-lg mb-8 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Inspire others with your faith, wisdom, and spiritual experiences.
              Your story could be the light someone needs.
            </p>
            <Link
              to="/#"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Share Your Wisdom
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
};

export default Devotional;
