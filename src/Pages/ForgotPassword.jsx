
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from '../Api/ApiClient';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 30;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      ApiClient.post('/admin/auth/forgot-password', { phone: phoneNumber })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setOtpSent(true);
            setErrorMessage("");
            setIsResendDisabled(true);
            Swal.fire({
              title: "Success!",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              confirmButtonText: "Try Again",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        });
    }
    // else {
    //   setErrorMessage("Please enter a valid phone number.");
    // }
  };

  const handleOtpVerification = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode) {
      ApiClient.patch('/admin/auth/verify-forget-otp', { phone: phoneNumber, otp: otpCode })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setIsOtpVerified(true);
            setErrorMessage("");
            Swal.fire({
              title: "Success!",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              confirmButtonText: "Try Again",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        });
    }
    // else {
    //   setErrorMessage("Please enter OTP.");
    // }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword && newPassword === retypeNewPassword) {
      ApiClient.patch('/admin/auth/change-forget-password', {
        phone: phoneNumber,
        new_password: newPassword,
        retype_new_password: retypeNewPassword,
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setPhoneNumber("");
            setOtp(["", "", "", ""]);
            setNewPassword("");
            setRetypeNewPassword("");
            setOtpSent(false);
            setIsOtpVerified(false);
            Swal.fire({
              title: "Success!",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate('/login');
          } else {
            Swal.fire({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              confirmButtonText: "Try Again",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        });
    }
    else {
      Swal.fire({
        title: "Error!",
        text: "Confirm password does not match with the new password",

        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleResendOtp = () => {
    if (phoneNumber) {
      ApiClient.post('/admin/auth/forgot-password', { phone: phoneNumber })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: "Success!",
              text: "OTP has been resent.",
              icon: "success",
              confirmButtonText: "OK",
            });
            setIsResendDisabled(true);
          } else {
            Swal.fire({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              confirmButtonText: "Try Again",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        });
    }
    // else {
    //   setErrorMessage("Please enter a valid phone number.");
    // }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Enter your phone number to receive OTP for password reset.
        </p>

        {successMessage && (
          <div className="mt-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}

        {!otpSent && (
          <form onSubmit={handleOtpSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="880 phone number"
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            >
              Send OTP
            </button>
          </form>
        )}

        {otpSent && !isOtpVerified && (
          <form onSubmit={handleOtpVerification} className="mt-6">
            <div className="mb-4">
           

              <div className="flex gap-6 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-12 h-12 text-center text-lg border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
              </div>

            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            >
              Verify OTP
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              className={`mt-2 w-full px-4 py-2 rounded-md border ${isResendDisabled ? "bg-gray-200 text-gray-500" : "text-blue-500 hover:bg-blue-100 border-blue-500"}`}
            >
              {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </form>
        )}

        {isOtpVerified && (
          <form onSubmit={handlePasswordChange} className="mt-6">
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="retypeNewPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showRetypePassword ? "text" : "password"}
                  id="retypeNewPassword"
                  value={retypeNewPassword}
                  onChange={(e) => setRetypeNewPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                >
                  {showRetypePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            >
              Reset Password
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

