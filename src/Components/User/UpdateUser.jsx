import { useState, useEffect } from 'react';
import ApiClient from '../../Api/ApiClient';
import Swal from 'sweetalert2';
import { FaTimes } from 'react-icons/fa'; // Import the cross icon

const UpdateUser = () => {
  const [profileId, setProfileId] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    admin_type: '',
    photo: null,
  });
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false); // Track if the photo is uploaded

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await ApiClient.get('/admin/profile/single');

        //  ;

         setProfileId(response.data.data.id);

        // Assuming the response contains profile data
        setProfileData({
          name: response.data.data.name || '',
          email: response.data.data.email || '',
          phone: response.data.data.phone || '',
          admin_type: response.data.data.admin_type || '',
          photo: response.data.data.photo || null,
        });

        
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);
  const handleInputChange = e => {
    const { name, value, files } = e.target;

    if (name === 'photo' && files && files.length > 0) {
      const file = files[0];

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        // If the file type is not valid, reset the input field
        e.target.value = ''; // Reset the file input
        Swal.fire({
          title: 'Error!',
          text: 'Only JPG, JPEG, and PNG files are allowed.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
        return;
      }

      // If file type is valid, update the profile data
      setProfileData({
        ...profileData,
        [name]: files[0], // Set the selected file
      });

      // Set photo uploaded flag
      setIsPhotoUploaded(true);
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  // update personal data
  const handleSaveClick = async event => {
    event.preventDefault();

    // Check if the photo is uploaded
    if (!profileData.photo) {
      Swal.fire({
        title: 'Error!',
        text: 'Please choose a profile photo.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return; // Don't submit if photo is not selected
    }

    const formData = new FormData();

    // Append personal details to FormData
    formData.append('name', profileData.name || '');
    formData.append('email', profileData.email || '');
    formData.append('photo', profileData.photo || '');
    
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log(profileId);
    try {
      const response = await ApiClient.patch(
        `/admin/profile/single/${profileId}`,
        // '/admin/profile/single/6',
        formData
      );
      console.log('Update response:', response.data);
      Swal.fire({
        title: 'Success!',
        text: 'Profile Update successfull.',
        confirmButtonText: 'Okay',
        customClass: {
          popup: 'w-72 h-auto p-3',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton:
            'bg-DefaultColor text-white px-4 py-1 text-sm rounded-md',
        },
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        const errorMessages = Object.values(error.response.data)
          .flat()
          .join('\n');

        Swal.fire({
          title: 'Failed!',
          text: errorMessages,
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'w-72 h-auto p-3',
            title: 'text-lg',
            content: 'text-xs',
            confirmButton:
              'bg-DefaultColor text-white px-4 py-1 text-sm rounded-md',
          },
        });
      }
    }
  };

  // Function to handle "cross" icon click and navigate back
  const handleCancelClick = () => {
    window.history.back();
  };

  return (
    <div className="block mx-auto p-8 w-full max-w-4xl">
      <div className="bg-tenderDetails p-8 rounded-lg shadow-lg w-full">
        <h3 className="text-xl font-semibold mb-6  text-blue-600">
          Update User
        </h3>
        <form onSubmit={handleSaveClick}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className=" w-full">
              <label className="block text-gray-700 font-medium ">
                User Name:
              </label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className=" w-full">
              <label className="block text-gray-700 font-medium ">
                User Email:
              </label>
              <input
                type="text"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* phone */}
            <div className=" w-full">
              <label className="block text-gray-700 font-medium ">
                User Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                placeholder="Your Number"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-0"
                readOnly
              />
            </div>

            
            {/* Photo */}
            <div className=" w-full">
              <label className="block text-gray-700 font-medium ">Photo:</label>
              <input
                type="file"
                name="photo"
                // value={profileData.photo}
                onChange={handleInputChange}
                className="w-full p-1.5 border border-gray-200 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-[200px] px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;