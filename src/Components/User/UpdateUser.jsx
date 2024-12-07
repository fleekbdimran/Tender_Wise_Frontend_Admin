import { useState, useEffect } from 'react';
import ApiClient from '../../Api/ApiClient';
import Swal from 'sweetalert2';

const UpdateUser = () => {
  const [profileId, setProfileId] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    admin_type: '',
    photo: null,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await ApiClient.get('/admin/profile/single');

        console.log(response.data.data);

         setProfileId(response.data.data.id);

        // Assuming the response contains profile data
        setProfileData({
          name: response.data.data.name || '',
          email: response.data.data.email || '',
          phone: response.data.data.phone || '',
          admin_type: response.data.data.admin_type || '',
          photo: response.data.data.photo || null,
        });

        // setProfileImage(
        //   response.data.data.photo
        //     ? `${baseUrl}${response.data.data.photo}`
        //     : null
        // );
        //  setNidImage(
        //    response.data.nidcard_picture
        //      ? // ? // ? `${response.data.nidcard_picture}`
        //        //   `/` + response.data.nidcard_picture.split('/').pop()
        //        // : null
        //        `${baseUrl}${response.data.nidcard_picture}`
        //      : null
        //  );
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);
  const handleInputChange = e => {
    const { name, value, files } = e.target;

    if (name === 'photo' && files && files.length > 0) {
      setProfileData({
        ...profileData,
        [name]: files[0], // Set the selected file
      });
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

    const formData = new FormData();

    // Append personal details to FormData
    formData.append('name', profileData.name || '');
    formData.append('email', profileData.email || '');
    formData.append('photo', profileData.photo || '');
    // formData.append('description', profileData.description);

    // Append files (ensure these are File objects)
    // if (profileImage instanceof File) {
    //   formData.append('photo', profileImage);
    // }
    // Debugging: Log FormData content to check
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

            {/* {[
              {
                label: 'Password *',
                value: password,
                setter: setPassword,
                show: showPassword,
                toggle: setShowPassword,
              },
              {
                label: 'Re-type Password *',
                value: retypePassword,
                setter: setRetypePassword,
                show: showRetypePassword,
                toggle: setShowRetypePassword,
              },
            ].map(({ label, value, setter, show, toggle }, index) => (
              <div key={index} className="w-full">
                <label className="block text-gray-700 font-medium">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${label}`}
                    value={value}
                    onChange={e => setter(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => toggle(!show)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  >
                    {show ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            ))} */}

            {/* <div className="w-full">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="adminType"
              >
                Admin Type <span className="text-black-500">*</span>
              </label>
              <select
                id="adminType"
                className="w-full p-3 border border-gray-300 rounded-lgfocus:outline-none focus:ring-0"
                // value={adminType}
                value={profileData.admin_type}
                // onChange={e => setAdminType(e.target.value)}
                required
                readOnly
              >
                <option value="">Select Admin Type</option>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
              </select>
            </div> */}
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
