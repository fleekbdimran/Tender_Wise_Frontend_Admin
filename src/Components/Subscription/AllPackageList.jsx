import { useState, useEffect } from "react";
import ApiClient from "../../Api/ApiClient";
import Swal from 'sweetalert2';

// API Utility for Fetching Data
const fetchPackages = async () => {
  try {
    console.log("Fetching packages...");
    const response = await ApiClient.get("/admin/package");
    console.log("Packages fetched successfully:", response.data.data);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
};

const AllPackageList = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [activity, setActivity] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    duration: "",
    status: 1,
  });
  const [createFormData, setCreateFormData] = useState({
    name: "",
    amount: "",
    duration: "",
    status: 1,
  });
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadPackages = async () => {
      console.log("Loading packages...");
      const fetchedPackages = await fetchPackages();
      setPackages(fetchedPackages);
    };
    loadPackages();
  }, []);

  const filteredPackages = packages.filter((pkg) => {

    const isMatch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.duration.toString().includes(searchTerm);

    const statusMatch = activity === "" || pkg.status.toString() === activity;

    return isMatch && statusMatch;
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    console.log("Creating new package...");

    // Create package data
    const data = {
      name: createFormData.name,
      amount: createFormData.amount,
      duration: createFormData.duration,
    };
    console.log(data);

    // Using fetch to create a package
    fetch(`http://192.168.0.230:9009/api/v1/admin/package`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())  // Parse response as JSON
      .then((data) => {
        if (data.success === true) {
          Swal.fire({
            title: 'Success!',
            text: data.message || 'Package created successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          setShowCreateForm(false); // Close the modal after successful creation
          window.location.reload();

        } else {
          Swal.fire({
            title: 'Error!',
            text: data.message || 'Failed to create package. Please try again.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(`Editing package ID ${editingPackageId}`);

    // Updated package data
    const data = {
      name: formData.name,
      amount: formData.amount,
      duration: formData.duration,
      status: formData.status,
    };

    console.log(data);

    ApiClient.patch(`/admin/package/${editingPackageId}`, data)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          Swal.fire({
            title: 'Success!',
            text: response.data.message || 'Package updated successfully!',
            icon: 'success',
            confirmButtonText: 'OK',

          });
          setShowEditForm(false);
          window.location.reload();
        } else {
          Swal.fire({
            title: 'Error!',
            text: response.data.message || 'Failed to update package. Please try again.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      });
  };

  const handleEdit = (pkg) => {
    setEditingPackageId(pkg.id);
    setFormData({
      name: pkg.name,
      amount: pkg.amount,
      duration: pkg.duration,
      status: pkg.status,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPackages = filteredPackages.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6">
      <>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              + Create Package
            </button>

            <div className="flex justify-center gap-2 items-center">
              <p className="">Status:</p>
              <select
                id="status"
                className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-3"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="">All</option>
                <option value="1">Available</option>
                <option value="0">Unavailable</option>
              </select>
            </div>
          </div>


          <input
            type="text"
            placeholder="Search by Name or Duration"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md border-2 border-gray-300"
          />
        </div>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Duration</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Update</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPackages.map((pkg, index) => (
              <tr key={pkg.id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-800">{startIndex + index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.amount}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {pkg.duration === 1 ? "One Month" : `${pkg.duration} months`}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <span className={pkg.status === 1 ? "text-blue-500" : "text-red-500"}>
                    {pkg.status === 1 ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td
                  className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                  onClick={() => {
                    setSelectedPackage(pkg);
                    handleEdit(pkg);
                    setShowEditForm(true);
                  }}
                >
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredPackages.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Create Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-md p-6 w-96">
              <h2 className="text-2xl font-semibold mb-4">Create New Package</h2>
              <form onSubmit={handleCreateSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={createFormData.name}
                    onChange={handleCreateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    value={createFormData.amount}
                    onChange={handleCreateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="number"
                    name="duration"
                    value={createFormData.duration}
                    onChange={handleCreateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-md p-6 w-96">
              <h2 className="text-2xl font-semibold mb-4">Edit Package</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value={1}>Available</option>
                    <option value={0}>Unavailable</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default AllPackageList;




// Using fetch to update the package
// fetch(`http://192.168.0.230:9009/api/v1/admin/package/${editingPackageId}`, requestOptions)
//   .then((response) => response.json())
//   .then((updatedPackage) => {
//     if (updatedPackage && updatedPackage.message) {

//       fetch('/admin/packages')
//         .then((response) => response.json())
//         .then((updatedPackages) => {
//           setPackages(updatedPackages);

//           Swal.fire({
//             title: 'Success!',
//             text: updatedPackage.message,
//             icon: 'success',
//             confirmButtonText: 'OK',
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching packages:", error);
//           Swal.fire({
//             title: 'Error!',
//             text: updatedPackage.message,
//             icon: 'error',
//             confirmButtonText: 'Try Again',
//           });
//         });
//     } else {
//       throw new Error(updatedPackage?.message || 'Failed to update package.');
//     }
//   })
//   .catch((error) => {
//     console.error("Error updating package:", error);
//     Swal.fire({
//       title: 'Error!',
//       text: error.message || 'Something went wrong while updating the package.',
//       icon: 'error',
//       confirmButtonText: 'Try Again',
//     });
//   });






{/* <div className="flex items-center justify-center h-screen w-full bg-gray-50">
<div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
  <h2 className="text-3xl font-bold text-center mb-6">
    {editingPackageId ? "Update Package" : "Create Package"}
  </h2>
  <form onSubmit={editingPackageId ? handleEditSubmit : handleCreateSubmit} className="space-y-6">
    {/* Form Fields */}
//     <div className="flex flex-col">
//       <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="name">
//         Name
//       </label>
//       <input
//         type="text"
//         id="name"
//         name="name"
//         placeholder="Enter Name"
//         value={formData.name}
//         onChange={handleChange}
//         className="p-4 border border-gray-300 rounded-lg shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500"
//         required
//       />
//     </div>

//     <div className="flex flex-col">
//       <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="amount">
//         Amount
//       </label>
//       <input
//         type="text"
//         id="amount"
//         name="amount"
//         placeholder="Enter Amount"
//         value={formData.amount}
//         onChange={handleChange}
//         className="p-4 border border-gray-300 rounded-lg shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500"
//         required
//       />
//     </div>

//     <div className="flex flex-col">
//       <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="duration">
//         Duration (Month)
//       </label>
//       <input
//         type="text"
//         id="duration"
//         name="duration"
//         placeholder="Enter Duration in Month"
//         value={formData.duration}
//         onChange={handleChange}
//         className="p-4 border border-gray-300 rounded-lg shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500"
//         required
//       />
//     </div>


//     <div className="flex justify-center gap-2 items-center">
//       <p className="mb-4">Status:</p>
//       <select
//         id="status"
//         className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-3"
//         value={formData.status}
//         onChange={handleChange}
//       >

//         <option value="1">Available</option>
//         <option value="0">Unavailable</option>
//       </select>
//     </div>

//     <div className="flex justify-end gap-3">
//       <button
//         type="submit"
//         className="w-auto py-2 px-6 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         {editingPackageId ? "Update" : "Submit"}
//       </button>
//       <button
//         onClick={() => setShowCreateForm(false)}
//         className="w-auto py-2 px-6 bg-red-700 text-white rounded-lg text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Cancel
//       </button>
//     </div>
//   </form>
// </div>
// </div> */}