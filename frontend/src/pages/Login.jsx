import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
   const {isAuth,setIsAuth,setProfile} = useAuth();

  const navigateTo = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin= async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    
    try{
      const {data}  = await axios.post('https://blog-app-tc0o.onrender.com/api/users/login',{email,password,role} , { withCredentials: true });
      console.log(data);
      toast.success("Login Successful");
      setProfile(data);
      setIsAuth(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");

    }catch(error){
      console.log(error);
      
      // Check if the error is due to unverified email
      if (error.response?.data?.emailNotVerified) {
        toast.error(
          "Please verify your email before logging in. Check your inbox or request a new verification email.",
          {
            duration: 5000,
          }
        );
        
        // Show option to resend verification email
        if (confirm("Would you like to resend the verification email?")) {
          navigateTo("/resend-verification");
        }
      } else {
        toast.error(
          error.response?.data?.message || "Please fill the required fields",
          {
            duration: 3000,
          }
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 transition-colors duration-300">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blog<span className="text-blue-500">Hive</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">Login</h1>
            
            <div className="space-y-4">
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="" className="bg-white dark:bg-gray-700">Select Role</option>
                <option value="user" className="bg-white dark:bg-gray-700">User</option>
                <option value="admin" className="bg-white dark:bg-gray-700">Admin</option>
              </select>
              
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div>
                <input 
                  type="password" 
                  placeholder="Your Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div className="pt-2 text-center">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
              
              <div className="space-y-2">
                <p className="text-center text-gray-600 dark:text-gray-300">
                  New User?{' '}
                  <Link 
                    to="/register" 
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Register Now!
                  </Link>
                </p>
                
                <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                  Need to verify your email?{' '}
                  <Link 
                    to="/resend-verification" 
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Resend verification email
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
