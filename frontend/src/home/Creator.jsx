import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Creator() {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4001/api/users/admins",
          { withCredentials: true }
        );
        setAdmin(data.admin);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const containerClasses = `py-20 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'} transition-colors duration-300`;
  const cardClasses = `
    group flex flex-col items-center rounded-2xl shadow-xl hover:shadow-2xl 
    transition-all duration-500 p-8 h-full transform hover:-translate-y-2 hover:scale-[1.02]
    ${theme === 'dark' ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'bg-white/90 backdrop-blur-sm border-gray-200'}
    border
  `;
  const avatarClasses = `
    w-24 h-24 md:w-32 md:h-32 rounded-full object-cover 
    border-4 ${theme === "dark" ? "border-emerald-400" : "border-emerald-500"}
    shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110
  `;

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
          <div className="flex items-center justify-center mb-6">
            <div className={`text-4xl mr-4 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`}>
              ⭐
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent`}>
              Meet Our Creators
            </h2>
            <div className={`text-4xl ml-4 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`}>
              🚀
            </div>
          </div>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover the talented writers and creators who bring amazing stories to life
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Loading creators...
            </p>
          </motion.div>
        ) : admin?.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {admin.slice(0, 4).map((element, index) => (
                <motion.div
                  key={element._id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={cardClasses}>
                    <div className="relative">
                      <img
                        src={element.photo?.url || "/avatar-placeholder.png"}
                        alt="creator"
                        className={avatarClasses}
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                        <span className="text-white text-xs font-bold">★</span>
                      </div>
                    </div>
                    
                    <div className="text-center flex-1">
                      <h3 className={`text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {element.name}
                      </h3>
                      <p className={`text-sm mb-4 px-3 py-1 rounded-full inline-block ${
                        theme === 'dark' 
                          ? 'bg-emerald-900/50 text-emerald-200' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {element.role}
                      </p>
                      
                      <div className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <p className="mb-2">Passionate storyteller</p>
                        <p>Creating amazing content</p>
                      </div>
                    </div>

                    <div className="mt-6 w-full">
                      <Link
                        to="/creators"
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        View Profile
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
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
            <div className={`text-6xl mb-4 ${theme === "dark" ? "text-emerald-400" : "text-emerald-500"}`}>
              👥
            </div>
            <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              No creators found yet. Be the first to join our community!
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
          <div className={`max-w-4xl mx-auto p-8 rounded-3xl ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
              : 'bg-gradient-to-r from-emerald-50 to-teal-50'
          } border border-gray-200 dark:border-gray-600`}>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Join Our Creator Community
            </h3>
            <p className={`text-lg mb-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Share your knowledge, experiences, and creativity with the world. Become part of our growing community of writers and storytellers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Become a Creator
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/creators"
                className={`inline-flex items-center px-8 py-4 border-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  theme === 'dark' 
                    ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                View All Creators
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Creator;