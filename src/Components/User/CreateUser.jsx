
import { useState } from 'react';
import ApiClient from '../../Api/ApiClient';
import Swal from 'sweetalert2'; // Import SweetAlert2

const CreateUsers = () => {
  const [usersName, setUsersName] = useState('');
  const [usersEmail, setUsersEmail] = useState('');
  const [usersPhone, setUsersPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [adminType, setAdminType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!usersName || !usersEmail || !usersPhone || !password || !retypePassword || !adminType) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(usersEmail)) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Validate phone number format (basic validation for numeric input)
    const phonePattern = /^[0-9]{11}$/; // This can be adjusted to a specific phone format
    if (!phonePattern.test(usersPhone)) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid 10-digit phone number.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Validate password and retypePassword match
    if (password !== retypePassword) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Prepare form data to send to API
    const formData = new FormData();
    formData.append("name", usersName);
    formData.append("phone", usersPhone);
    formData.append("email", usersEmail);
    formData.append("password", password);
    formData.append("retype_password", retypePassword);
    formData.append("admin_type", adminType);

    try {
      // Send data using the ApiClient
      const response = await ApiClient.post('/admin/profile', formData);
      console.log('User created successfully:', response.data);

      // Show success SweetAlert
      Swal.fire({
        title: 'Success!',
        text: 'User created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Reset form
      setUsersName('');
      setUsersEmail('');
      setUsersPhone('');
      setPassword('');
      setRetypePassword('');
      setAdminType('');
    } catch (error) {
      console.error("Error creating user:", error);

      // Show error SweetAlert
      Swal.fire({
        title: 'Error',
        text: 'There was an error creating the user. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="block mx-auto p-8 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create User</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h3 className="text-xl font-semibold mb-6 text-center text-blue-600">User Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[ 
              { label: 'User Name', id: 'usersName', type: 'text', value: usersName, setter: setUsersName },
              { label: 'User Phone', id: 'usersPhone', type: 'tel', value: usersPhone, setter: setUsersPhone },
              { label: 'User Email', id: 'usersEmail', type: 'email', value: usersEmail, setter: setUsersEmail },
              { label: 'Password', id: 'password', type: 'password', value: password, setter: setPassword },
              { label: 'Re-type Password', id: 'retypePassword', type: 'password', value: retypePassword, setter: setRetypePassword },
            ].map(({ label, id, type, value, setter }) => (
              <div key={id} className="w-full">
                <label className="block text-gray-700 font-medium mb-1" htmlFor={id}>
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${label}`}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  required
                />
              </div>
            ))}

            {/* Admin Type Dropdown */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="adminType">
                Admin Type
              </label>
              <select
                id="adminType"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={adminType}
                onChange={(e) => setAdminType(e.target.value)}
                required
              >
                <option value="">Select Admin Type</option>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
              </select>
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

export default CreateUsers;
