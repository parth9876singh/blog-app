import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

function Contact() {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "a24b3b22-6d5f-4a34-8677-e4d35a273902",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className={` py-24 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-lg shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Get in Touch
              </h2>
              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                We love to hear from you! Send us a message or contact us directly.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Contact Form */}
              <div className="w-full md:w-1/2">
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Send us a message
                </h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                        errors.username 
                          ? 'border-red-500 focus:ring-red-300' 
                          : theme === 'dark' 
                            ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:ring-blue-300' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                      }`}
                      {...register("username", { required: "Name is required" })}
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-300' 
                          : theme === 'dark' 
                            ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:ring-blue-300' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                      }`}
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Your Message"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                        errors.message 
                          ? 'border-red-500 focus:ring-red-300' 
                          : theme === 'dark' 
                            ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:ring-blue-300' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                      }`}
                      {...register("message", { required: "Message is required" })}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white ${
                        isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : theme === 'dark' 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      <FaPaperPlane className="text-sm" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="w-full md:w-1/2">
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Contact Information
                </h3>
                
                <div className={`space-y-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <FaPhone className={`text-lg ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Phone</p>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>+91 9876543210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                      <FaEnvelope className={`text-lg ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Email</p>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>help@parth.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                      <FaMapMarkerAlt className={`text-lg ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Address</p>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Lovely Professional University,Punjab, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;