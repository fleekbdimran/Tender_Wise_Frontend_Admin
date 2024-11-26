
import React, { useState, useEffect } from "react";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Pagination, message } from "antd";
import ApiClient from "../../Api/ApiClient";

// EditPassModal Component
const EditPassModal = ({ isOpen, onClose, onSubmit, admin }) => {
  const [sectorName, setSectorName] = useState(admin?.status === 1 ? "Available" : "Unavailable");
  const [categoryName, setCategoryName] = useState(admin?.admin_type || "");

  const handleSubmit = () => {
    if (!sectorName || !categoryName) {
      alert("Please fill out all required fields.");
      return;
    }
    onSubmit({ sectorName, categoryName });
    onClose(); // Close the modal after submission
  };

  useEffect(() => {
    if (admin) {
      setSectorName(admin.status === 1 ? "Available" : "Unavailable");
      setCategoryName(admin.admin_type);
    }
  }, [admin]);

  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Admin Type <span className="text-red-500">*</span>
          </label>
          <select
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-500 outline-none"
          >
            <option value="">Select Admin Type</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            value={sectorName}
            onChange={(e) => setSectorName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-500 outline-none"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 text-white py-2 rounded-md font-semibold hover:bg-teal-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

// UserList Component
const UserList = () => {
  const [adminUserList, setAdminUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [selectedAdmin, setSelectedAdmin] = useState(null); // Track selected admin for modal
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAdminProfiles = async () => {
      try {
        const response = await ApiClient.get("/admin/profile");
        if (response.data?.data) {
          setAdminUserList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching admin profiles:", error);
      }
    };

    fetchAdminProfiles();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdminList = adminUserList.filter((admin) =>
    admin.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAdminList = filteredAdminList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setModalOpen(true);
  };

  const handleModalSubmit = async (updatedDetails) => {
    const { sectorName, categoryName } = updatedDetails;

    try {
      // PATCH request with Axios
      const response = await ApiClient.patch(
        `/admin/profile/${selectedAdmin.id}`,
        {
          admin_type: categoryName,
          status: sectorName === "Available" ? 1 : 0, // Convert status to 1 or 0
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token from localStorage
          },
        }
      );

      if (response.status === 200) {
        message.success("Admin details updated successfully!");

        // Update the local state immediately after the successful update
        setAdminUserList((prevAdminList) => {
          return prevAdminList.map((admin) =>
            admin.id === selectedAdmin.id
              ? { ...admin, admin_type: categoryName, status: sectorName === "Available" ? 1 : 0 }
              : admin
          );
        });

        setModalOpen(false); // Close the modal after successful update
      } else {
        message.error("update admin details.");
      }
    } catch (error) {
      console.error("Error updating admin profile:", error);
      message.error("Error occurred while updating details.");
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="mb-4 flex items-center border border-gray-300 rounded p-2 w-3/6">
        <SearchOutlined className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by User List"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full text-sm outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left font-bold">Id</th>
              <th className="py-3 px-6 text-left font-bold">Name</th>
              <th className="py-3 px-6 text-left font-bold">Email</th>
              <th className="py-3 px-6 text-left font-bold">Phone</th>
              <th className="py-3 px-6 text-left font-bold">Admin-Type</th>
              <th className="py-3 px-6 text-left font-bold">Status</th>
              <th className="py-3 px-6 text-left font-bold">Update</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {paginatedAdminList.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left font-bold">{admin.id}</td>
                <td className="py-3 px-6 text-left">{admin.name}</td>
                <td className="py-3 px-6 text-left">{admin.email}</td>
                <td className="py-3 px-6 text-left">{admin.phone || "N/A"}</td>
                <td className="py-3 px-6 text-left">{admin.admin_type || "N/A"}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      admin.status === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {admin.status === 1 ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => handleEditClick(admin)}
                    className="text-blue-500 hover:underline"
                  >
                    <EditOutlined /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredAdminList.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Render the EditPassModal */}
      <EditPassModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        admin={selectedAdmin}
      />
    </div>
  );
};

export default UserList;
