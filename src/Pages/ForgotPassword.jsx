// import React, { useState } from "react";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate API call
//     setTimeout(() => {
//       setSuccessMessage("Password reset instructions have been sent to your email.");
//       setEmail("");
//     }, 1000);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Forgot Password
//         </h2>
//         <p className="mt-2 text-sm text-center text-gray-600">
//           Enter your Phone Number to receive password reset instructions.
//         </p>

//         {successMessage && (
//           <div className="mt-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
//             {successMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="mt-6">
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//               className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
//           >
//             Submit
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <a href="/login" className="text-blue-500 hover:underline">
//             Back to Login
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import React, { useState } from "react";

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle OTP submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();

    // Simulating sending OTP to the phone number
    if (phoneNumber) {
      setOtpSent(true);
      setSuccessMessage("OTP sent to your phone number.");
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid phone number.");
    }
  };

  // Handle OTP verification
  const handleOtpVerification = (e) => {
    e.preventDefault();
    
    // Simulating OTP verification (In real-world scenario, verify OTP through backend)
    if (otp === "123456") {  // Assume "123456" as correct OTP
      setIsOtpVerified(true);
      setSuccessMessage("OTP verified successfully. You can now reset your password.");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (newPassword) {
      setSuccessMessage("Your password has been reset successfully.");
      setPhoneNumber("");
      setOtp("");
      setNewPassword("");
      setOtpSent(false);
      setIsOtpVerified(false);
    } else {
      setErrorMessage("Please enter a new password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
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

        {/* Phone Number Input */}
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
                placeholder="Enter your phone number"
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

        {/* OTP Input */}
        {otpSent && !isOtpVerified && (
          <form onSubmit={handleOtpVerification} className="mt-6">
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* New Password Input */}
        {isOtpVerified && (
          <form onSubmit={handlePasswordChange} className="mt-6">
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
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
