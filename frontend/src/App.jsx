import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Creators from "./pages/Creators";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ResendVerification from "./pages/ResendVerification";
import Dashbord from "./pages/Dashbord";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import UpdateBlog from "./dashbord/UpdateBlog";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const location = useLocation();
  const hideNavbarFooter = ["/dashbord", "/login", "/register", "/verify-email", "/resend-verification"].includes(
    location.pathname
  );
  const { theme } = useContext(ThemeContext);
  const { blogs, isAuth, loading } = useAuth();
  console.log(blogs);
  console.log(isAuth);

  // Set theme class on the html element
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme || "light");
  }, [theme]);

  return (
    <div
      className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}
    >
      {!hideNavbarFooter && <Navbar />}

      <main className="flex-grow bg-white dark:bg-gray-900 transition-colors duration-200">
        <Routes>
          <Route
            exact
            path="/"
            element={
              loading
                ? <div>Loading...</div>
                : isAuth
                  ? <Home />
                  : <Navigate to="/login" />
            }
          />{" "}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/favorites" element={
            loading
              ? <div>Loading...</div>
              : isAuth
                ? <Favorites />
                : <Navigate to="/login" />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/blog/:id" element={<Details />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </main>

      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
