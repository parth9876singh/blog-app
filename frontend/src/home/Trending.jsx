import React from 'react';
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Trending = () => {
  const { blogs } = useAuth();
  const { theme } = useTheme();

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  const containerClasses = `py-20 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'} transition-colors duration-300`;
  const cardClasses = `
    group block overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl 
    transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.03]
    ${theme === 'dark' ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'}
    border border-gray-200 dark:border-gray-700
  `;
  const titleClasses = `text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`;
  const borderClasses = theme === 'dark' ? 'border-gray-700' : 'border-gray-100';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
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
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent`}>
            Trending Stories
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover the most popular and engaging content from our community of creators
          </p>
        </motion.div>

        {blogs?.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Carousel 
              responsive={responsive} 
              infinite 
              autoPlay 
              autoPlaySpeed={4000} 
              keyBoardControl
              containerClass="gap-6"
              itemClass="p-3"
              showDots={true}
              dotListClass="custom-dot-list-style"
              arrows={true}
              customArrow={<CustomArrow />}
            >
              {blogs.slice(0, 20).map((blog, index) => (
                <motion.div
                  key={blog._id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/blog/${blog._id}`} className={cardClasses}>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={blog.blogImage?.url || "/placeholder.jpg"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full shadow-lg">
                        {blog.category}
                      </div>
                      <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                        #{index + 1}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Hover overlay with read more */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-semibold text-sm">
                          Read Story →
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className={titleClasses}>{blog.title}</h3>
                      
                      <p className={`text-sm mb-4 line-clamp-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {blog.description || "Explore this fascinating story and discover new insights that will inspire and enlighten..."}
                      </p>

                      <div className={`flex items-center justify-between pt-4 border-t ${borderClasses}`}>
                        <div className="flex items-center">
                          <div className="relative">
                            <img
                              src={blog.adminPhoto || "/avatar-placeholder.png"}
                              alt={blog.adminName || "Unknown"}
                              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="ml-3">
                            <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                              {blog.adminName || "Unknown Author"}
                            </p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            theme === 'dark'
                              ? 'bg-blue-900/50 text-blue-200'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            Trending
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </Carousel>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className={`text-6xl mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`}>
              🔥
            </div>
            <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              No trending posts yet. Be the first to create viral content!
            </p>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Stories
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Custom arrow component for the carousel
const CustomArrow = ({ onClick, direction }) => {
  const { theme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
        direction === 'left' ? 'left-4' : 'right-4'
      } ${
        theme === 'dark' 
          ? 'bg-gray-800/80 text-white hover:bg-gray-700/80' 
          : 'bg-white/80 text-gray-900 hover:bg-white shadow-lg'
      } backdrop-blur-sm border border-gray-200 dark:border-gray-600`}
    >
      <svg 
        className={`w-6 h-6 ${direction === 'left' ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

export default Trending;