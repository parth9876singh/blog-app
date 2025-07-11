import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Creators() {
  const [creators, setCreators] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/users/admins",
          {
            withCredentials: true,
          }
        );
        setCreators(data.admin);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, []);

  return (
    <div
      className={` py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <h1
          className={`text-3xl font-bold mb-10 text-center ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Our Creative Team
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {creators.map((creator) => (
            <div
              key={creator._id}
              className={`w-full sm:w-64 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white"
              }`}
            >
              <div className="relative">
                <img
                  src={creator.photo.url}
                  alt="avatar"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                  <img
                    src={creator.photo.url}
                    alt="avatar"
                    className={`w-16 h-16 rounded-full mx-auto border-4 ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    }`}
                  />
                </div>
              </div>
              <div className="px-4 py-6 mt-4">
                <h2
                  className={`text-center text-xl font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {creator.name}
                </h2>
                <p
                  className={`text-center mt-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {creator.email}
                </p>
                <p
                  className={`text-center mt-1 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {creator.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Creators;
