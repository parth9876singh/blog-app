import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Register = () => {

  const {isAuth,setIsAuth,setProfile} = useAuth();

  const navigateTo = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [education, setEducation] = useState();
  const [photo, setPhoto] = useState();
  const [photoPreview, setPhotoPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const changePhotoHandler = (e)=> {
    console.log(e);
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () =>{
      setPhotoPreview(reader.result);
      setPhoto(selectedFile);

    }
  };

  const handleRegister= async (e)=>{
    e.preventDefault();
    
    // Enhanced email validation for Gmail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      toast.error('Please use a valid Gmail address');
      return;
    }

    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('education', education);
    formData.append('photo', photo);

    try{
      const {data}  = await axios.post('http://localhost:4001/api/users/register', formData);
      console.log(data);
      
      // Show success message about email verification
      toast.success("Registration successful! Please check your email to verify your account.");
      
      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      
      // Redirect to login page instead of home
      navigateTo("/login");

    }catch(error){
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto flex justify-center items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 transition-colors duration-300">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blog<span className="text-blue-500">Hive</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">Create Account</h1>
            
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
              
              <input 
                type="text" 
                placeholder="Your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              
              <div>
                <input 
                  type="email" 
                  placeholder="Your Gmail Address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Only Gmail addresses are allowed for registration
                </p>
              </div>
              
              <input 
                type="number" 
                placeholder="Your Phone Number" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              
              <input 
                type="password" 
                placeholder="Your Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              
              <select 
                value={education} 
                onChange={(e) => setEducation(e.target.value)} 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="" className="bg-white dark:bg-gray-700">Select Your Education</option>
                <option value="BCA" className="bg-white dark:bg-gray-700">BCA</option>
                <option value="MCA" className="bg-white dark:bg-gray-700">MCA</option>
                <option value="BTech" className="bg-white dark:bg-gray-700">BTech</option>
                <option value="BBA" className="bg-white dark:bg-gray-700">BBA</option>
                <option value="LAW" className="bg-white dark:bg-gray-700">LAW</option>
              </select>
              
              <div className="flex items-center space-x-4 py-2">
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
                  <img 
                    src={photoPreview || "https://via.placeholder.com/80?text=Photo"} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Profile Photo
                  </label>
                  <input 
                    type="file" 
                    onChange={changePhotoHandler} 
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-gray-700 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-gray-600 transition-colors cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Register'
                  )}
                </button>
              </div>
              
              <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Login Now!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
