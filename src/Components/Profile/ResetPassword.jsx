import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../Api/ApiClient'; // Import your ApiClient
import Swal from 'sweetalert2'; // Import SweetAlert

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const [error, setError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle old password visibility
  const [showPassword, setShowPassword] = useState(false); // State to toggle new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [profile, setProfile] = useState(null); // Store profile data
  const navigate = useNavigate();

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const response = await ApiClient.get('/admin/profile/single');
      console.log('Profile data:', response.data);
      setProfile(response.data);
      if (response.data && response.data.phone) {
        setPhoneNumber(response.data.phone); // Set phone number if available
      } else {
        
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError("Failed to fetch profile data.");
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch profile data when the component is mounted
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

 

    // Prepare payload for the API call using dynamic phone number
    const payload = {
      phone: phoneNumber,  // Dynamically include the phone number
      current_password: oldPassword,
      new_password: password,
      retype_new_password: confirmPassword,
    };

    console.log(payload); // Log payload to check data

    try {
      // Call API to reset password
      const response = await ApiClient.patch('/admin/auth/change-password', payload);
      console.log('Password changed successfully:', response.data);

      // Check if the response status is 200 or 201
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Password has been reset successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/success"); // Redirect or handle success
      }
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Error!",
          text: "Invalid data. Please check your input.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Failed to change password. Please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Reset Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your Number and new password to reset your account.
        </p>
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 rounded-md p-2 mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number Input */}
          <div>
            <label htmlFor="phoneNumber" className=" text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full pl-3  py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Old Password Input */}
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative mt-1">
              <input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="block w-full pl-3  py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="CurrentPassword"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* New Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-3  py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="NewPassword"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="ConfirmPassword"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-offset-1 focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;




// import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import ApiClient from '../../Api/ApiClient'; // Import your ApiClient
// import Swal from 'sweetalert2'; // Import SweetAlert

// function ResetPassword() {
//   const [oldPassword, setOldPassword] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState(""); // Example static phone number or fetch dynamically
//   const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle old password visibility
//   const [showPassword, setShowPassword] = useState(false); // State to toggle new password visibility
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
//   const [profile, setProfile] = useState(null); // Store profile data
//   const navigate = useNavigate();

//   // Fetch profile data
//   const fetchProfile = async () => {
//     try {
//       const response = await ApiClient.get('/admin/profile/single');
//       console.log('Profile data:', response.data);
//       setProfile(response.data); // Set profile data
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProfile(); // Fetch profile data when the component is mounted
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate input fields
//     if (!oldPassword || !password || !confirmPassword) {
//       setError("All fields are required");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setError(""); // Clear error

//     // Prepare payload for the API call
//     const payload = {
//       phone: phoneNumber, // Use dynamic phone number
//       current_password: oldPassword,
//       new_password: password,
//       retype_new_password: confirmPassword,
//     };

//     try {
//       // Call API to reset password
//       const response = await ApiClient.patch('/admin/auth/change-password', payload);
//       console.log('Password changed successfully:', response.data);

//       // Check if the response status is 200 or 201
//       if (response.status === 200 || response.status === 201) {
//         // Show SweetAlert success message
//         Swal.fire({
//           icon: 'success',
//           title: 'Password Reset Successful!',
//           text: 'Your password has been reset successfully.',
//         });

//         // Redirect or handle success
//         navigate("/success"); // You can replace this with the appropriate path for success
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       if (error.response && error.response.status === 401) {
//         console.error('Unauthorized. Please log in again.');
//         // Optionally handle logout or redirection logic here
//       } else {
//         setError("Failed to change password. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
//         <h2 className="text-2xl font-bold text-gray-800 text-center">Reset Password</h2>
//         <p className="text-sm text-gray-600 text-center mb-6">
//           Enter your Number and new password to reset your account.
//         </p>
//         {error && (
//           <div className="text-red-600 bg-red-100 border border-red-300 rounded-md p-2 mb-4 text-sm">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Old Password Input */}
//           <div>
//             <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
//               Current Password
//             </label>
//             <div className="relative mt-1">
//               <input
//                 id="oldPassword"
//                 type={showOldPassword ? "text" : "password"}
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 className="block w-full pl-10 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//                 placeholder="CurrentPassword"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
//                 onClick={() => setShowOldPassword(!showOldPassword)}
//               >
//                 {showOldPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//           </div>

//           {/* New Password Input */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               New Password
//             </label>
//             <div className="relative mt-1">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="block w-full pl-10 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//                 placeholder="NewPassword"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//           </div>

//           {/* Confirm Password Input */}
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//               Confirm New Password
//             </label>
//             <div className="relative mt-1">
//               <input
//                 id="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="block w-full pl-10 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//                 placeholder="ConfirmPassword"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-offset-1 focus:outline-none"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;






// import { useState } from "react";
// import { LockClosedIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from 'react-router-dom';
// import ApiClient from '../../Api/ApiClient'; // Import your ApiClient
// import Swal from 'sweetalert2'; // Import SweetAlert

// function ResetPassword() {
//   const [oldPassword, setOldPassword] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate input fields
//     if (!oldPassword || !password || !confirmPassword) {
//       setError("All fields are required");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setError(""); // Clear error

//     // Prepare payload for the API call
//     const payload = {
//       phone: "8801618657265", // Replace this with dynamic phone number if needed
//       current_password: oldPassword,
//       new_password: password,
//       retype_new_password: confirmPassword,
//     };

//     try {
//       // Call API to reset password
//       const response = await ApiClient.patch('/admin/auth/change-password', payload);
//       console.log('Password changed successfully:', response.data);

//       // Check if the response status is 200 or 201
//       if (response.status === 200 || response.status === 201) {
//         // Show SweetAlert success message
//         Swal.fire({
//           icon: 'success',
//           title: 'Password Reset Successful!',
//           text: 'Your password has been reset successfully.',
//         });

//         // Redirect or handle success
//         navigate("/success"); // You can replace this with the appropriate path for success
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       if (error.response && error.response.status === 401) {
//         console.error('Unauthorized. Please log in again.');
//         // Optionally handle logout or redirection logic here
//       } else {
//         setError("Failed to change password. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
//         <h2 className="text-2xl font-bold text-gray-800 text-center">Reset Password</h2>
//         <p className="text-sm text-gray-600 text-center mb-6">
//           Enter your Number and new password to reset your account.
//         </p>
//         {error && (
//           <div className="text-red-600 bg-red-100 border border-red-300 rounded-md p-2 mb-4 text-sm">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Old Password Input */}
//           <div>
//             <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
//               Current Password
//             </label>
//             <div className="relative mt-1">
//               <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="oldPassword"
//                 type="password"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 className="block w-full pl-10 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//                 placeholder="Enter old password"
//                 required
//               />
//             </div>
//           </div>

//           {/* New Password Input */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               New Password
//             </label>
//             <div className="relative mt-1">
//               <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="block w-full pl-10 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//                 placeholder="Enter new password"
//                 required
//               />
//             </div>
//           </div>

//           {/* Confirm Password Input */}
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//               Confirm New Password
//             </label>
//             <div className="relative mt-1">
//               <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="block w-full pl-10 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//                 placeholder="Confirm new password"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-offset-1 focus:outline-none"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;


