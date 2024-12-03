

// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="flex items-center space-x-2">
//       <img
//         className="w-10 h-10 rounded-full border border-gray-300"
//         src="https://via.placeholder.com/150"
//         alt="Profile"
//       />
//       <div>
//         <p className="font-medium text-gray-800">John Doe</p>
//         <p className="text-sm text-gray-600">Admin</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect, useRef } from 'react';

const Profile = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/150'
  );
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('https://via.placeholder.com/150');
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleResetPassword = () => {
    alert('Reset Password clicked!');
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Picture */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={toggleMenu}
      >
        <img
          className="w-16 h-16 rounded-full border border-gray-300" // Larger profile picture
          src={profileImage}
          alt="Profile"
        />
        <div>
          <p className="font-medium text-gray-800">John Doe</p>
          <p className="text-sm text-gray-600">Admin</p>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded shadow-lg">
          <label
            htmlFor="upload-image"
            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
          >
            Upload Picture
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <button
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleRemoveImage}
          >
            Remove Picture
          </button>
          <button
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
          <button
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;



