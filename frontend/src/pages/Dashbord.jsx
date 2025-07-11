import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashbord/Sidebar";
import MyProfile from "../dashbord/MyProfile";
import CreateBlog from "../dashbord/CreateBlog";
import UpdateBlog from "../dashbord/UpdateBlog";
import MyBlogs from "../dashbord/MyBlogs";
import AdminFavorites from "../dashbord/AdminFavorites";
import { Navigate } from "react-router-dom";
const Dashbord = () => {
  const { profile, isAuth,loading } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  console.log(profile);
  console.log(isAuth);
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}

  if(!isAuth){
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : component === "Favorites" ? (
          <AdminFavorites />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
};

export default Dashbord;
