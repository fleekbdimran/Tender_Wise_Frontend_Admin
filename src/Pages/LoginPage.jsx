import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import LoginAnimation from "../Animation/Login.json";
import PropTypes from 'prop-types';  // Import PropTypes

function LoginPage({ onLogin }) {  // Correct the prop name here
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setPhoneError('');
    setPasswordError('');
    setLoginError('');

    let isValid = true;

    // Validate phone number
    if (!phone) {
      setPhoneError('Please enter your phone number.');
      isValid = false;
    } else if (!/^\d{11}$/.test(phone)) {
      setPhoneError('Please enter a valid 11-digit phone number.');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Please enter your password.');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    }

    // If validation is successful, log the user in
    if (isValid) {
      onLogin();  // Call the onLogin function passed as a prop
      navigate('/dashboard');
    } else {
      setLoginError('Invalid credentials, please try again.');
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    alert('A reset password link has been sent to your email.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Animation Section */}
      <div className="w-1/2 h-full flex justify-center items-center">
        <Lottie animationData={LoginAnimation} loop={true} />
      </div>

      {/* Login Form Section */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Phone Number Input */}
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

          {/* Password Input */}
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

          {/* Remember me and Forgot Password */}
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

          {/* Submit Button */}
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
    </div>
  );
}

// PropTypes validation
LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,  // Corrected prop validation for onLogin
};

export default LoginPage;
