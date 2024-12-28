
import { useState, useEffect } from "react";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import ApiClient from "../../Api/ApiClient";
import Swal from "sweetalert2";

// EditPassModal Component
const EditPassModal = ({ isOpen, onClose, onSubmit, admin }) => {
  const [sectorName, setSectorName] = useState(admin?.status === 1 ? "Available" : "Unavailable");
  const [categoryName, setCategoryName] = useState(admin?.admin_type || "");

  useEffect(() => {
    if (admin) {
      setSectorName(admin.status === 1 ? "Available" : "Unavailable");
      setCategoryName(admin.admin_type);
    }
  }, [admin]);

  const handleSubmit = () => {
    if (!sectorName || !categoryName) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all required fields!",
      });
      return;
    }
    onSubmit({ sectorName, categoryName });
    onClose();
  };

  if (!isOpen) return null;

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
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
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
  const [pageSize] = useState(10);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [activity, setActivity] = useState("");


  useEffect(() => {
    const fetchAdminProfiles = async () => {
      const queryParams = new URLSearchParams();
      if (keyword) queryParams.append('key', keyword);
      if (type) queryParams.append('admin_type', type);
      if (activity) queryParams.append('status', activity);

      try {
        const response = await ApiClient.get(`/admin/profile?${queryParams.toString()}`);
        console.log(response)
        if (response.data?.data) {
          setAdminUserList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching admin profiles:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch user profiles.",
        });
      }
    };

    fetchAdminProfiles();


  }, [keyword, type, activity]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdminList = adminUserList.filter((admin) => {
    const matchesKeyword = admin.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = type ? admin.admin_type === type : true;
    const matchesActivity = activity ? admin.status.toString() === activity : true;
    return matchesKeyword && matchesType && matchesActivity;
  });


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
      const response = await ApiClient.patch(`/admin/profile/${selectedAdmin.id}`, {
        admin_type: categoryName,
        status: sectorName === "Available" ? 1 : 0,
      });


      if (response.status === 200) {
        setAdminUserList((prevAdminList) =>
          prevAdminList.map((admin) =>
            admin.id === selectedAdmin.id
              ? { ...admin, admin_type: categoryName, status: sectorName === "Available" ? 1 : 0 }
              : admin
          )
        );

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Admin details updated successfully!",
        });

        setModalOpen(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating the details.",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      <div className="flex items-center justify-between gap-3">
        <div className="mb-4 flex items-center border border-gray-300 rounded p-2 w-3/6">
          <SearchOutlined className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="search by Name, Email and Phone Number"
            className="w-full text-sm outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>


        {/* Dropdown Menu */}
        <div className="flex justify-center gap-2 items-center">
          <p className="mb-4">User Type:</p>
          <select
            id="type"
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </div>

  
        {/* Available or not */}
        <div className="flex justify-center gap-2 items-center">
          <p className="mb-4">Status:</p>
          <select
            id="status"
            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-3"
            value={activity} 
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">Available</option>
            <option value="0">Unavailable</option>
          </select>
        </div>

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
            {paginatedAdminList.map((admin, index) => (
              <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left font-bold">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{admin.name}</td>
                <td className="py-3 px-6 text-left">{admin.email}</td>
                <td className="py-3 px-6 text-left">{admin.phone || "N/A"}</td>
                <td className="py-3 px-6 text-left">{admin.admin_type || "N/A"}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${admin.status === 1
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
