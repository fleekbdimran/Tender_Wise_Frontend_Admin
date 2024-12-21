
import React, { useState, useEffect, useRef } from 'react';
import ApiClient from '../../Api/ApiClient';
import { PHOTO_BASE_URL_Admin } from '../../Api/config';
import UserPhoto from '../../../src/image/fleekBD.jpg'
import tenderLogo from '../../../src/image/logo.png';
import { useNavigate } from 'react-router-dom';


const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState();
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

  {/* -----------------Reset Password---------------------- */ }


  const handleNavigate = () => {
    navigate('/reset-password'); // This will navigate to the ResetPassword route
  };

  {/* -----------------Reset Password---------------------- */ }

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


        setProfileData({
          name: response.data.data.name || '',
          photo: response.data.data.photo || '',
          admin_type: response.data.data.admin_type || '',
        });
        setProfileImage(
          response.data.data.photo
            ? `${PHOTO_BASE_URL_Admin}${response.data.data.photo}`
            : null
        );
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();

  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = () => {
    navigate('/dashboard');
  }

  const handleProfileClick = () => {
    navigate('/updateUser');
  }


  return (

    <>
    
      
      <div className="relative" ref={menuRef}>
      
      <div className="w-full bg-gray-100 shadow-lg p-4 ">
        {/* Profile Picture */}
        <div className="flex justify-between">
          <div className="cursor-pointer" onClick={handleHomeClick}>
            <img src={tenderLogo} alt="" className="h-16" />
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer w-1/6  p-1.5 rounded-md border border-gray-200"
            onClick={toggleMenu}
          >
            <img
              // src={UserPhoto}
              src={
                profileData?.photo
                  ? `${PHOTO_BASE_URL_Admin}${profileData.photo}`
                  : 'https://via.placeholder.com/50'
              }
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
        <div
          // ref={dropdownRef}
          className="absolute right-0 mt-1 w-80 mr-3 bg-white border border-gray-300 shadow-lg rounded-md p-4 text-sm z-30 "
        >
          <div className="items-center justify-center mx-auto text-center gap-0 text-lg">
            {/* my profile */}
            <div
              className="cursor-pointer hover:bg-gray-100 p-2 rounded border-b  "
              onClick={handleProfileClick}
            >
              {/* <FaUserCircle className="text-gray-600" /> */}
              <span>My Profile</span>
            </div>

            {/* edit my tender
            <div
              className=" cursor-pointer hover:bg-gray-100 p-2 rounded border-b "
              // onClick={handleEditMyTenderClick}
            >
              <span>Settings</span>
            </div> */}

            {/* -----------------Reset Password---------------------- */}
            <div>
              <button onClick={handleNavigate}>
                Change Password
              </button>
            </div>
            {/* -----------------Reset Password---------------------- */}


            <div className=" cursor-pointer hover:bg-gray-100 p-2 rounded border-b ">
              <button className="" onClick={handleLogout}>

                Logout
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
    </>
    
  );
};

export default Header;







