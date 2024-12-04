

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
import ApiClient from '../../Api/ApiClient';
import { PHOTO_BASE_URL_Admin } from '../../Api/config';
import UserPhoto from '../../../src/image/fleekBD.jpg'
import tenderLogo from '../../../src/image/logo.png';
const Header = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/150'
  );
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
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
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


   const [profileData, setProfileData] = useState({
     name: '',
     photo: '',
   });

   useEffect(() => {
     const fetchProfileData = async () => {
       try {
         const response = await ApiClient.get('/admin/profile/single/');

         console.log(response.data.data);
        //  setProfileId(response.data.data.id);

         // Assuming the response contains profile data
         setProfileData({
           name: response.data.data.name || '',
           photo: response.data.data.photo || '',
           admin_type: response.data.data.admin_type || '',
         });
        //  setProfileImage(
        //    response.data.data.photo
        //      ? `${PHOTO_BASE_URL_Admin}${response.data.data.photo}`
        //      : null
        //  );
       } catch (error) {
         console.error('Error fetching profile data:', error);
       }
     };

     fetchProfileData();
     // Reload after 1 seconds
     const interval = setInterval(() => {
       fetchProfileData();
     }, 1000);

     return () => clearInterval(interval);
   }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div className="w-full bg-gray-100 shadow-lg p-4 ">
        {/* Profile Picture */}
        <div className='flex justify-between'>
          <div className="">
            <img src={tenderLogo} alt="" className='h-16' />
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer w-1/6  p-1.5 rounded-md border border-gray-200"
            onClick={toggleMenu}
          >
            <img
              src={UserPhoto}
              // src={
              //   profileData?.photo
              //     ? `${PHOTO_BASE_URL_Admin}${profileData.photo}`
              //     : 'https://via.placeholder.com/50'
              // }
              alt="User Photo"
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-800"> {profileData?.name}</p>
              <p className="text-sm text-gray-600">{profileData?.admin_type}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded shadow-lg">
          {/* <div>
            <h1>My Profile</h1>
          </div> */}

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

export default Header;



