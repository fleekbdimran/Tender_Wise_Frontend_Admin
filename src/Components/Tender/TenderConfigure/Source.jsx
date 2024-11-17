// import { useEffect, useState } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';

// import ApiClient from './../../../Api/ApiClient';

// // Modal component for adding/editing designation types
// function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange }) {
//   if (!isOpen) return null;

//   // Handle radio button change
//   const handleRadioChange = (e) => {
//     onStatusChange(e.target.value);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Name:
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Your Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>

//           <div className="flex justify-center mt-4">
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="Available"
//                 checked={currentStatus === 'Available'}
//                 onChange={handleRadioChange}
//                 className="mr-2"
//               />
//               Available
//             </label>
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="Unavailable"
//                 checked={currentStatus === 'Unavailable'}
//                 onChange={handleRadioChange}
//                 className="mr-2"
//               />
//               Unavailable
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
//           >
//             <SendOutlined className="mr-2" /> Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // Main Source component
// function Source() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("Add Designation Type");
//   const [currentStatus, setCurrentStatus] = useState("Available");
//   const [editingItem, setEditingItem] = useState(null);
//   const [upazilaData, setUpazilaData] = useState([]);

//   // Open modal with relevant title and data
//   const openModal = (title, item) => {
//     setModalTitle(title);
//     setEditingItem(item);
//     setCurrentStatus(item ? item.status : "Available");
//     setIsModalOpen(true);
//   };

//   // Handle status change in the modal
//   const handleStatusChange = (newStatus) => {
//     setCurrentStatus(newStatus);
//   };

//   // Fetch Upazila data from API
//   useEffect(() => {
//     const fetchUpazilaData = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/source?key=');
//         setUpazilaData(response.data.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUpazilaData();
//   }, []);

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upazila</h2>

//       <button
//         onClick={() => openModal("Add Designation Type")}
//         className="bg-teal-500 text-white px-7 py-3 rounded-lg self-start"
//       >
//         Create
//       </button>

//       <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-md"
//         >
//           <option value="">All</option>
//           <option value="Available">Available</option>
//           <option value="Unavailable">Unavailable</option>
//         </select>

//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
//         onStatusChange={handleStatusChange}
//       />

//       <div className="flex-grow overflow-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {upazilaData.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{item.name}</td>
//                 <td className="px-4 py-2 border-b">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       item.status === 'Available'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-red-100 text-red-700'
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <button
//                     onClick={() => openModal(`Edit ${item.name}`, item)}
//                     className="text-blue-500 hover:underline flex items-center"
//                   >
//                     <EditOutlined className="mr-1" /> Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Source;

import { useEffect, useState } from "react";
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from "@ant-design/icons";
import ApiClient from "./../../../Api/ApiClient";

function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange }) {
  if (!isOpen) return null;

  const handleRadioChange = (e) => {
    onStatusChange(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <CloseOutlined />
        </button>
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="flex justify-center mt-4">
            <label className="flex items-center mx-4">
              <input
                type="radio"
                name="status"
                value="Available"
                checked={currentStatus === "Available"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Available
            </label>
            <label className="flex items-center mx-4">
              <input
                type="radio"
                name="status"
                value="Unavailable"
                checked={currentStatus === "Unavailable"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Unavailable
            </label>
          </div>
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
          >
            <SendOutlined className="mr-2" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function Source() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Designation Type");
  const [currentStatus, setCurrentStatus] = useState("Available");
  const [upazilaData, setUpazilaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const openModal = (title, item) => {
    setModalTitle(title);
    setCurrentStatus(item ? item.status : "Available");
    setIsModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
  };

  const fetchUpazilaData = async () => {
    try {
      const response = await ApiClient.get("/admin/tender-config/source?key=");
      setUpazilaData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUpazilaData();
  }, []);

  // Filter data based on search term and status filter
  const filteredData = upazilaData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upazila</h2>

      <div className="flex items-center justify-between mb-4">
        {/* Create Button */}
        <button
          onClick={() => openModal("Add Designation Type")}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg"
        >
          Create
        </button>
        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories"
            className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
            <SearchOutlined />
          </button>
        </div>

        {/* Filter Dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        
      </div>

      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />

      {/* Data Table */}
      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{item.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openModal(`Edit ${item.name}`, item)}
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    <EditOutlined className="mr-1" /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Source;

