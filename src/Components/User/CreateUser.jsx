
import { useState } from 'react';
import ApiClient from '../../Api/ApiClient';
import Swal from 'sweetalert2';

const CreateUsers = () => {
  const [usersName, setUsersName] = useState('');
  const [usersEmail, setUsersEmail] = useState('');
  const [usersPhone, setUsersPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [adminType, setAdminType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usersName || !usersEmail || !usersPhone || !password || !retypePassword || !adminType) {
      Swal.fire('Error', 'Please fill in all required fields.', 'error');
      return;
    }

 

    const formData = new FormData();
    formData.append('name', usersName);
    formData.append('phone', usersPhone);
    formData.append('email', usersEmail);
    formData.append('password', password);
    formData.append('retype_password', retypePassword);
    formData.append('admin_type', adminType);

    try {
      const response = await ApiClient.post('/admin/profile', formData);

      const successMessage = response?.data?.message || 'User created successfully.';
      Swal.fire({
        title: 'Success!',
        text: successMessage,
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'w-72 h-auto p-3',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
        },
      });

      setUsersName('');
      setUsersEmail('');
      setUsersPhone('');
      setPassword('');
      setRetypePassword('');
      setAdminType('');
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'An error occurred while creating the user.';
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'w-72 h-auto p-3',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
        },
      });
    }
  };

  return (
    <div className="block mx-auto p-8 w-full max-w-4xl">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h3 className="text-xl font-semibold mb-6  text-blue-600">Create User</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[ 
              { label: 'User Name', id: 'usersName', type: 'text', value: usersName, setter: setUsersName },
              { label: 'User Email *', id: 'usersEmail', type: 'email', value: usersEmail, setter: setUsersEmail },
              { label: 'User Phone *', id: 'usersPhone', type: 'tel', value: usersPhone, setter: setUsersPhone },
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

            {[
              { label: 'Password *', value: password, setter: setPassword, show: showPassword, toggle: setShowPassword },
              { label: 'Re-type Password *', value: retypePassword, setter: setRetypePassword, show: showRetypePassword, toggle: setShowRetypePassword },
            ].map(({ label, value, setter, show, toggle }, index) => (
              <div key={index} className="w-full">
                <label className="block text-gray-700 font-medium mb-1">{label}</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${label}`}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
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
            ))}

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

