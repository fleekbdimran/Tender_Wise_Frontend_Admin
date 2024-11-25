
import React, { useState, useEffect } from "react";
import ApiClient from "../../Api/ApiClient"; // Your ApiClient setup

const AllContactUs = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await ApiClient.get("/admin/contact-us");
      setUsers(response.data.data); // Assuming the response data structure
      console.log("Users fetched:", response.data.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (id) => {
    try {
      const response = await ApiClient.patch(`/admin/contact-us/${id}`, {
        status: 1, // Update status to 1 (Viewed)
      });
      console.log("Update result:", response.data);

      // Refresh the data after update
      fetchUsers();
    } catch (error) {
      console.error("Error updating status:", error.response || error.message);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">All Contact Us</h1>
        <div className="overflow-x-auto">
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.phone}</td>
                  <td className="p-2 border">
                    {user.status === 0 ? "Received" : "Viewed"}
                  </td>
                  <td className="p-2 border">
                    {user.status === 0 && (
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => updateStatus(user.id)}
                      >
                        Mark as Viewed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllContactUs;
