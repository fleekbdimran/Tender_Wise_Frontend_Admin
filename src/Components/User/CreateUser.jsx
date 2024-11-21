
import { useState } from 'react';

const CreateUsers = () => {
  const [usersName, setUsersName] = useState('');
  const [usersEmail, setUsersEmail] = useState('');
  const [usersPhone, setUsersPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [adminType, setAdminType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usersName || !usersEmail || !usersPhone || !password || !retypePassword || !adminType) {
      alert("Please fill in all required fields.");
      return;
    }
    if (password !== retypePassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Form submitted", {
      usersName,
      usersEmail,
      usersPhone,
      password,
      adminType
    });

    setUsersName('');
    setUsersEmail('');
    setUsersPhone('');
    setPassword('');
    setRetypePassword('');
    setAdminType('');
  };

  return (
    <div className="block mx-auto p-8 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold  mb-6 text-gray-800">Create User</h2>
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
              { label: 'Admin Type', id: 'adminType', type: 'text', value: adminType, setter: setAdminType },
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
