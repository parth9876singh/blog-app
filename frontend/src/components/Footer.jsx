import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <footer className={`bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-10 pb-6 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Blog<span className="text-blue-500 dark:text-blue-400">Hive</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Discover articles, share your thoughts, and join a growing community of writers and readers.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Explore
            </h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}>
                  Latest Posts
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}>
                  Trending
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}>
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}>
                  Tags
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className={`text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h2>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <a href="#" className={`text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200`}>
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className={`text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200`}>
                <BsYoutube className="h-6 w-6" />
              </a>
              <a href="#" className={`text-gray-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200`}>
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className={`container mx-auto mt-4 border-t border-gray-200 dark:border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300`}>
          <p className="mb-2 md:mb-0">&copy; 2025 BlogHive. All rights reserved.</p>
          <p className="hidden md:block">Built with ❤️ for readers & creators worldwide.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;