import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {profile ,isAuth,setIsAuth, loading} = useAuth();
  console.log(profile);
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
     const {data} =  await axios.get("https://blog-app-tc0o.onrender.com/api/users/logout", { 
        withCredentials: true 
      });
      toast.success(data.message)
      setIsAuth(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      alert("Failed to Logout");
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300 fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            <span className="text-blue-500">Blog</span>Hive
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link to="/" className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  HOME
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link to="/blogs" className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  location.pathname === '/blogs' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  BLOGS
                </Link>
              </motion.div>
              
              {isAuth && profile?.role !== "admin" && (
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link to="/favorites" className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    location.pathname === '/favorites' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>
                    FAVORITES
                  </Link>
                </motion.div>
              )}
              
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link to="/creators" className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  location.pathname === '/creators' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  CREATORS
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link to="/about" className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  location.pathname === '/about' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  ABOUT
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link to="/contact" className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  location.pathname === '/contact' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  CONTACT
                </Link>
              </motion.div>
            </div>

            <div className="flex items-center space-x-4 ml-4">
              <motion.button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                aria-label="Toggle dark mode"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <AiOutlineSun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <AiOutlineMoon className="w-5 h-5 text-gray-700" />
                )}
              </motion.button>
              
              {!loading && isAuth && profile?.role === "admin" ? (
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Link
                    to="/dashbord"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-2 px-6 rounded-full text-white text-sm font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    DASHBOARD
                  </Link>
                </motion.div>
              ) : (
                ""
              )}
              
              {!loading && !isAuth ? (
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 py-2 px-6 rounded-full text-white text-sm font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    LOGIN
                  </Link>
                </motion.div>
              ) : (
                !loading && isAuth && (
                  <motion.button 
                    onClick={handleLogout} 
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 py-2 px-6 rounded-full text-white text-sm font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    LOGOUT
                  </motion.button>
                )
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-button inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-300"
              aria-expanded="false"
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoCloseSharp className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Link to="/" className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  HOME
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/blogs" className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === '/blogs' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  BLOGS
                </Link>
              </motion.div>
              
              {isAuth && profile?.role !== "admin" && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link to="/favorites" className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    location.pathname === '/favorites' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>
                    FAVORITES
                  </Link>
                </motion.div>
              )}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/creators" className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === '/creators' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  CREATORS
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/about" className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === '/about' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  ABOUT
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/contact" className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === '/contact' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>
                  CONTACT
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between px-3 py-2"
              >
                <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">Dark Mode</span>
                <motion.button 
                  onClick={toggleTheme} 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  aria-label="Toggle dark mode"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? (
                    <AiOutlineSun className="w-5 h-5 text-yellow-300" />
                  ) : (
                    <AiOutlineMoon className="w-5 h-5 text-gray-700" />
                  )}
                </motion.button>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-2 space-y-2"
              >
                {!loading && isAuth && profile?.role === "admin" ? (
                  <Link
                    to="/dashbord"
                    className="block w-full text-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-3 px-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    DASHBOARD
                  </Link>
                ) : (
                  ""
                )}
                
                {!loading && !isAuth && (
                  <Link
                    to="/login"
                    className="block w-full text-center bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 py-3 px-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    LOGIN
                  </Link>
                )}
                
                {!loading && isAuth && (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 py-3 px-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    LOGOUT
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
