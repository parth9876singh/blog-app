import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setVerificationStatus('error');
      setMessage('Invalid verification link. Please check your email or request a new verification link.');
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token) => {
    try {
      const response = await axios.get(`http://localhost:4001/api/users/verify-email/${token}`);
      setVerificationStatus('success');
      setMessage(response.data.message);
      
      // Auto redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      setVerificationStatus('error');
      setMessage(error.response?.data?.message || 'Verification failed. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    // This would typically require the user to enter their email
    // For now, we'll redirect to a resend page
    navigate('/resend-verification');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto flex justify-center items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 transition-colors duration-300">
          <div className="text-center">
            <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Cilli<span className="text-blue-500">Blog</span>
            </Link>
            
            <div className="mt-8">
              {verificationStatus === 'verifying' && (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Verifying Your Email
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Please wait while we verify your email address...
                  </p>
                </div>
              )}

              {verificationStatus === 'success' && (
                <div className="space-y-4">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Email Verified Successfully!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {message}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Redirecting to login page...
                  </p>
                </div>
              )}

              {verificationStatus === 'error' && (
                <div className="space-y-4">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
                    <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Verification Failed
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {message}
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={handleResendVerification}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Resend Verification Email
                    </button>
                    <Link
                      to="/login"
                      className="block w-full text-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                      Go to Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 