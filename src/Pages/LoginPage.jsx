
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
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setPhoneError('');
    setPasswordError('');
    setLoginError('');

    let isValid = true;

    // Validate phone number
    if (!phone) {
      toast.error('Please enter your phone number.');
      isValid = false;
    } else if (!/^\d{11}$/.test(phone)) {
      toast.error('Please enter a valid 11-digit phone number.');
      isValid = false;
    }

    // Validate password
    if (!password) {
      toast.error('Please enter your password.');
      isValid = false;
    } else if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      isValid = false;
    }

    // If validation is successful, make the API call to login
  //   if (isValid) {
  //     try {
  //       const response = await ApiClient.post('/v1/user/auth/login', { phone, password });
  //       console.log( response.data);

  //       if (response && response.token) {
  //         localStorage.setItem('Bearer', response.data.token);  // Save the token in localStorage
  //         onLogin();
  //         toast.success('Login successful!');
  //         navigate('/dashboard'); // Redirect to the dashboard
  //       } else {
  //         setLoginError('Invalid response data from the server.');
  //         toast.error('Unexpected response, please try again.');
  //       }
  //     } catch (error) {
     
  //       toast.error(error.message || 'Invalid credentials, please try again.');
  //     }
  //   }
  // };

  if (isValid) {
    try {
      const response = await ApiClient.post('/v1/user/auth/login', { phone, password });
      console.log(response.data);

      if (response && response.data.token) {
        localStorage.setItem('Bearer', response.data.token);
        onLogin();
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Unexpected response, please try again.');
      }
    } catch (error) {
      toast.error(error.message || 'Invalid credentials, please try again.');
    }
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

        <form className="space-y-4" onSubmit={handleSubmit}>
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
            {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
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
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
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





