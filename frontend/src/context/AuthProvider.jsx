import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  //first we call the API to get the data from backend
  const [blogs, setBlogs] = useState(); //setBlog is a function and Blog is a variable, the data first come in setBlog from backend  and then  data is stored in Blog variable for use
  const [profile, setProfile] = useState();
  const [isAuth, setIsAuth] = useState(false); //isAuth is a variable and setIsAuth
  const [loading, setLoading] = useState(true); // add loading state
  //to call the API we use useEffect hook
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/users/my-profile",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Axios response2:", response);
        setProfile(response?.data.user);
        setIsAuth(true);
      } catch (error) {
        console.log("Profile fetch error:", error);
        setIsAuth(false);
      } finally {
        setLoading(false); // Only set loading to false after profile fetch
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/blogs/all-blog",
          { withCredentials: true }
        );
        console.log("Axios response1:", response);
        setBlogs(response.data.allBlogs); // adjust if backend sends { blogs: [...] }
      } catch (error) {
        console.log(error);
      }
      // Remove the finally block from fetchBlogs - only fetchProfile should control loading
    };
    fetchBlogs();
    fetchProfile();
  }, []);
  return (
    <AuthContext.Provider
      value={{ blogs, setProfile, profile, isAuth, setIsAuth,loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

//Recived data at one place from backend through API ans serve the data in all files
