import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../Api/ApiClient';

const AllContactUs = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activity, setActivity] = useState(""); // For status filtering
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await ApiClient.get('/admin/contact-us');
      setUsers(response.data.data); // Assuming the API returns the data array
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = async (id) => {
    try {
      // Update the status of the message to "Viewed"
      const response = await ApiClient.patch(`/admin/contact-us/${id}`, { status: 1 });

      // Update the local state to reflect the status change without refetching all users
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: 1 } : user
        )
      );

      navigate(`/contact-us/${id}`); // Navigate to the message detail page
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on selected activity (status)
  const filteredUsers = users.filter((user) => {
    if (activity === "") return true; // No filter if "All" is selected
    return user.status.toString() === activity; // Filter by selected status
  });

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded shadow-md">
        <div className='flex justify-between items-center mb-2'>
          <h1 className="text-2xl font-bold mb-4">All Contact Us</h1>
          <div className="flex justify-center gap-2 items-center">
            <p className="mb-4">Status:</p>
            <select
              id="status"
              className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-3"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              <option value="">All</option>
              <option value="1">Viewed</option>
              <option value="0">Received</option>
            </select>
          </div>
        </div>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phone}</td>
                <td className="p-2 border">
                  {user.status === 0 ? 'Received' : 'Viewed'}
                </td>
                <td className="p-2 border">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleViewClick(user.id)} // On click, mark as viewed
                  >
                    👁
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllContactUs;
