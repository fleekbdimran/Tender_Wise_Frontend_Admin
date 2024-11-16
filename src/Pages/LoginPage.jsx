import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import LoginAnimation from "../Animation/Login.json";
import PropTypes from 'prop-types';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import ApiClient from "../Api/ApiClient";  // Import the ApiClient

function LoginPage({ onLogin }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Phone and Password validation
  const validateForm = () => {
    if (!phone) {
      toast.error('Please enter your phone number.');
      return false;
    }
    if (!/^\d{11}$/.test(phone)) {
      toast.error('Please enter a valid 11-digit phone number.');
      return false;
    }
    if (!password) {
      toast.error('Please enter your password.');
      return false;
    }
    // if (password.length < 8) {
    //   toast.error('Password must be at least 8 characters long.');
    //   return false;
    // }
    return true;
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate form before making the API call
    if (!validateForm()) return;

    try {
      const response = await ApiClient.post('/admin/auth/login/', { phone, password });
      const token = response.data.token;
      const userRole = response.data.user_type;

      // Store token and user role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
      
      // Trigger onLogin function and navigate to dashboard
      onLogin();
      navigate('/dashboard');
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response?.data?.message || 'Invalid credentials, please try again.');
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    toast.info('A reset password link has been sent to your email.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-1/2 h-full flex justify-center items-center">
        <Lottie animationData={LoginAnimation} loop={true} />
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <img src="/src/image/Logo.jpg" alt="Logo" className="mx-auto mb-4" style={{ height: 80 }} />
        
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
            {loginError && <p className="text-sm text-red-500 text-center mt-2">{loginError}</p>}
          </div>
        </form>
      </div>
      
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
