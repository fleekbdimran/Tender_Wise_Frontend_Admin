
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import LoginAnimation from "../Animation/Login.json"; // Path to your animation file
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ApiClient from "../Api/ApiClient"; // Custom Axios instance

function LoginPage({ onLogin }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // "Remember Me" state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const navigate = useNavigate();

  // Load saved credentials on component mount
  useEffect(() => {
    const savedPhone = localStorage.getItem('phone');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe) {
      setPhone(savedPhone || '');
      setPassword(savedPassword || '');
      setRememberMe(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();


    try {
      const response = await ApiClient.post('/admin/auth/login/', { phone, password });
      const { token }  = response.data;
      const userType = response.data.data.admin_type;

      console.log(userType);

      

      // Save token and user role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);

      // Save credentials if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem('phone', phone);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', true);
      } else {
        localStorage.removeItem('phone');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }

      // Trigger parent callback
      onLogin();

      const successMessage =
      response?.data?.message || 'An unknown error occurred';
    Swal.fire({
      title: 'Success!',
      text: successMessage,
      customClass: {
        popup: 'w-72 h-auto p-3',
        title: 'text-lg',
        content: 'text-xs',
        confirmButton: 'bg-blue-600 text-white px-4 py-1 text-sm rounded-md',
      },
    });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500); // Adjust timeout as needed
    } catch (error) {
      console.error('Login failed:', error);
      
      const errorMessage =
        error.response?.data?.message || 'An unknown error occurred';
      Swal.fire({
        title: 'Failed!',
        text: errorMessage,
        customClass: {
          popup: 'w-72 h-auto p-3',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton: 'bg-blue-600 text-white px-4 py-1 text-sm rounded-md',
        },
      });
    }
  };

  const handleForgotPassword = () => {
    // toast.info('A reset password link has been sent to your email.');
    // navigate('/forgot-password');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-1/2 h-full flex justify-center items-center">
        <Lottie animationData={LoginAnimation} loop />
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <img src="/src/image/Logo.jpg" alt="Logo" className="mx-auto mb-4" style={{ height: 80 }} />

        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Sign in</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="880 Phone Number"
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password at least 8 character long"
                className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;

