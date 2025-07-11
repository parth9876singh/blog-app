import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { FiX, FiMenu } from "react-icons/fi";
import toast from "react-hot-toast";

const Sidebar = ({ setComponent }) => {
  const { profile, setIsAuth } = useAuth();
  const { theme } = useTheme();
  const navigateTo = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Close sidebar when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target)) {
        closeSidebar();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") closeSidebar();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Hamburger button component (now inside Sidebar)
  const HamburgerButton = () => (
    <button 
      onClick={toggleSidebar}
      className={`fixed top-4 left-4 z-50 p-2 rounded-md md:hidden ${
        theme === 'dark' 
          ? 'text-gray-200 hover:bg-gray-700' 
          : 'text-gray-800 hover:bg-gray-200'
      }`}
      aria-label="Toggle sidebar"
    >
      <FiMenu size={24} />
    </button>
  );

  const handleComponents = (value) => {
    setComponent(value);
    closeSidebar();
  };

  const goToHome = () => {
    navigateTo("/");
    closeSidebar();
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
     const {data} =  await axios.get("https://blog-app-tc0o.onrender.com/api/users/logout", { 
        withCredentials: true 
      });
      toast.success(data.message)
      setIsAuth(false);
      navigateTo("/login");
      closeSidebar();
    } catch (error) {
      console.log(error);
      alert("Failed to Logout");
    }
  };

  // Theme-based classes
  const sidebarClasses = `
    fixed left-0 top-0 h-full w-64 p-4 z-40
    transition-transform duration-300 ease-in-out
    ${theme === 'dark' ? 
      'bg-gray-800 text-gray-200' : 
      'bg-white text-gray-800 shadow-xl'}
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0
  `;

  const profileClasses = `
    flex flex-col items-center mb-8 p-4 rounded-lg
    ${theme === 'dark' ? 
      'bg-gray-700' : 
      'bg-gray-100'}
  `;

  const buttonClasses = `
    w-full text-left px-4 py-3 my-1 rounded-lg
    transition-colors duration-200 flex items-center
    ${theme === 'dark' ? 
      'hover:bg-gray-700 text-gray-200' : 
      'hover:bg-gray-100 text-gray-800'}
    font-medium
  `;

  return (
    <>
      {/* Hamburger button - shows when sidebar is closed on mobile */}
      {!isOpen && <HamburgerButton />}

      {/* Overlay for mobile - shows when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <div 
        id="sidebar"
        className={sidebarClasses}
      >
        {/* Close button for mobile */}
        <button 
          onClick={closeSidebar}
          className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <FiX size={24} />
        </button>

        <div className={profileClasses}>
          <img 
            src={profile?.photo?.url || "/avatar-placeholder.png"} 
            alt="Profile" 
            className="w-20 h-20 rounded-full object-cover border-4 mb-3"
          />
          <p className="text-lg font-semibold">{profile?.name || "User"}</p>
          <p className="text-sm opacity-75">
            {profile?.role || "Blogger"}
          </p>
        </div>

        <ul className="space-y-1">
          <li>
          <button 
            onClick={() => handleComponents("My Blogs")} 
            className={buttonClasses}
          >
            <span className="mr-2">📝</span> My Blogs
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleComponents("Create Blog")} 
            className={buttonClasses}
          >
            <span className="mr-2">✏️</span> Create Blog
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleComponents("My Profile")} 
            className={buttonClasses}
          >
            <span className="mr-2">👤</span> My Profile
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleComponents("Favorites")} 
            className={buttonClasses}
          >
            <span className="mr-2">⭐</span> Favorites
          </button>
        </li>
        <li>
          <button 
            onClick={goToHome} 
            className={buttonClasses}
          >
            <span className="mr-2">🏠</span> Home
          </button>
        </li>
        <li>
          <button 
            onClick={handleLogout} 
            className={`${buttonClasses} ${theme === 'dark' ? 
              'hover:bg-red-700 text-red-300' : 
              'hover:bg-red-100 text-red-600'}`}
          >
            <span className="mr-2">🚪</span> Logout
          </button>
        </li>

        </ul>
      </div>
    </>
  );
};

export default Sidebar;