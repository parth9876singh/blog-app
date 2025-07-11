import React from 'react'
import { useAuth } from '../context/AuthProvider';
import { useTheme } from "../context/ThemeContext";

const MyProfile = () => {
    const { profile } = useAuth();
    console.log(profile);

    const { theme } = useTheme();

  // Theme-based classes
  const containerClasses = `flex justify-center items-center min-h-screen transition-colors duration-300 ${
    theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
  }`;

  const cardClasses = `shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full transition-colors duration-300 ${
    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  }`;

  const textClasses = {
    primary: theme === 'dark' ? 'text-white' : 'text-gray-800',
    secondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    border: theme === 'dark' ? 'border-gray-600' : 'border-gray-700'
  };
  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        <div className="relative">
          <img
            src={profile?.photo?.url || "/avatar-placeholder.png"}
            alt="Profile cover"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 flex justify-center">
            <img
              src={profile?.photo?.url || "/avatar-placeholder.png"}
              alt="Profile"
              className={`w-20 h-20 rounded-full border-4 ${textClasses.border}`}
            />
          </div>
        </div>
        <div className="px-6 pt-16 pb-8">
          <h2 className={`text-center text-xl font-semibold ${textClasses.primary}`}>
            {profile?.name || "User Name"}
          </h2>
          {profile?.email && (
            <p className={`text-center mt-2 ${textClasses.secondary}`}>
              {profile.email}
            </p>
          )}
          {profile?.phone && (
            <p className={`text-center mt-1 ${textClasses.secondary}`}>
              {profile.phone}
            </p>
          )}
          {profile?.role && (
            <p className={`text-center mt-1 ${textClasses.secondary}`}>
              {profile.role}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile
