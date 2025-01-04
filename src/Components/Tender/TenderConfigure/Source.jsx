
// import React, { useEffect, useState } from 'react';
// import { SendOutlined, CloseOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
// import Swal from 'sweetalert2';
// import ApiClient from '../../../Api/ApiClient';  // Ensure ApiClient is properly configured

// // Dropdown component for selecting the source type
// const Dropdown = ({ options, value, onChange, placeholder }) => {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-sm"
//     >
//       <option value="" disabled>
//         {placeholder}
//       </option>
//       {options.map((option, index) => (
//         <option key={index} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// // Modal component for adding or editing a source
// const DesignationTypeModal = ({
//   isOpen,
//   onClose,
//   title,
//   updateSource,
//   sourceData,
// }) => {
//   const [name, setName] = useState(sourceData?.name || '');
//   const [sourceType, setSourceType] = useState(sourceData?.type || '');

//   const sourceTypeOptions = [
//     { value: 'e-GP', label: 'e-GP' },
//     { value: 'Newspaper', label: 'Newspaper' },
//     { value: 'Online', label: 'Online' },
//     { value: 'Advertisement', label: 'Advertisement' },
//     { value: 'Website', label: 'Website' },
//     { value: 'Manual', label: 'Manual' },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         name,
//         type: sourceType,
//         details: `Collected from ${sourceType} on ${new Date().toLocaleDateString()}`,
//       };

//       if (sourceData) {
//         // Edit existing source
//         await ApiClient.patch(`/admin/tender-config/source/${sourceData.id}`, payload);
//       } else {
//         // Create new source
//         await ApiClient.post('/admin/tender-config/source', payload);
//       }

//       updateSource(payload);  // Refresh the data after saving
//       onClose();
//       Swal.fire('Success', 'Source has been saved!', 'success');
//     } catch (error) {
//       Swal.fire('Error', error.message, 'error');
//     }
//   };

//   return (
//     <div className={`fixed inset-0 ${!isOpen && 'hidden'} bg-gray-800 bg-opacity-50 flex justify-center items-center z-50`}>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Source Type:
//             </label>
//             <Dropdown
//               options={sourceTypeOptions}
//               value={sourceType}
//               onChange={setSourceType}
//               placeholder="Select Source Type"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Source Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter source name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
//             />
//           </div>
//           <button type="submit" className="bg-teal-500 text-white px-6 py-3 rounded-lg w-full">
//             <SendOutlined className="mr-2" /> Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Source List Management Component
// const Source = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add Source');
//   const [currentSourceData, setCurrentSourceData] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await ApiClient.get('/admin/tender-config/source');
//       setData(response.data.data || []);
//       setLoading(false);
//     } catch (err) {
//       Swal.fire('Error', err.message || 'Unable to fetch data', 'error');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [data]);

//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEditClick = (sourceData) => {
//     setCurrentSourceData(sourceData);
//     setModalTitle('Edit Source');
//     setIsModalOpen(true);
//   };

//   const updateSource = async (newData) => {
//     // Refresh the list after source is created or edited
//     await fetchData();
//   };

//   const totalPages = Math.ceil(filteredData.length / 10);
//   const paginatedData = filteredData.slice((currentPage - 1) * 10, currentPage * 10);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Source</h2>

//       <div className="flex justify-between items-center mb-4 w-full">
//         <button
//           onClick={() => {
//             setCurrentSourceData(null);
//             setModalTitle('Add Source');
//             setIsModalOpen(true);
//           }}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//         >
//           Create
//         </button>

//         <div className="flex items-center">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search sources"
//             className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
//           />
//           <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
//             <SearchOutlined />
//           </button>
//         </div>
//       </div>

//       {/* Modal for creating or editing source */}
//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         sourceData={currentSourceData}
//         updateSource={updateSource}
//       />

//       {/* Table displaying the sources */}
//       <div className="flex-grow overflow-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Type</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Details</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((item, index) => (
//               <tr key={item.id} className="border-b hover:bg-gray-100">
//                 <td className="px-4 py-3">{index + 1}</td>
//                 <td className="px-4 py-3">{item.name}</td>
//                 <td className="px-4 py-3">{item.type}</td>
//                 <td className="px-4 py-3">{item.details}</td>
//                 <td className="px-4 py-3">{item.status}</td>
//                 <td className="px-4 py-3 flex space-x-2">
//                   <button onClick={() => handleEditClick(item)} className="text-teal-500">
//                     <EditOutlined /> Edit
//                   </button>
//                   {/* Add additional actions like Delete here */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         {/* Pagination */}
//         <div className="mt-4 flex justify-center items-center ">
//           {/* <div>
// Page {currentPage} of {totalPages}
// </div> */}
//           <div className="flex space-x-2">
//             {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className={`px-4 py-2 rounded-lg ${page === currentPage ? 'bg-teal-500 text-white' : 'bg-white border'
//                   }`}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Source;





import { useState, useEffect } from "react";
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import ApiClient from "../../../Api/ApiClient";



function AddCategoryModal({ isOpen, onClose }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");





  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(categoryName, categoryType);

    try {
      const response = await ApiClient.post("/admin/tender-config/source", {
        name: categoryName,
        type: categoryType,
      });
      if (response.data.success === "false") {
        Swal.fire("Error!", response.data.message, "error");
      } else {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {

          window.location.reload(); // Reload the page
        });
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Something went wrong!", "error");
      console.log(error.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <CloseOutlined />
        </button>
        <h2 className="text-xl font-semibold mb-6">Add District</h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">

          
        <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> source:
            </label>


            <select name="select"
              onChange={(e) => setCategoryType(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" id="">
              <option value="">Select a Option</option>
              <option value="e-GP">e-GP</option>
              <option value="Newspaper">Newspaper</option>
              <option value="Online">Online</option>
              <option value="website">Website</option>
              <option value="advertisement">Advertisement</option>
              <option value="manual">Manual</option>
            </select>


          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter Upazila Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
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















function EditCategoryModal({ isOpen, onClose, category, onSubmit }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("1");
  const [categoryType, setCategoryType] = useState("");


  // Load initial category data
  useEffect(() => {
    if (category) {
      console.log(category);
      setCategoryName(category.name || "");

      setCategoryStatus(category.status?.toString() || "1");

      setCategoryType(category.type || "");
    }
  }, [category]);




  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(categoryStatus, categoryType ,categoryName);

    try {
      const response = await ApiClient.patch(
        `/admin/tender-config/source/${category.id}`,
        {
          name: categoryName,
          status: Number(categoryStatus),
          type: categoryType,
        }
      );

      if (response.data.success === "false") {
        console.log(response.data.message);
      } else {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          onSubmit(); // Refresh data
          window.location.reload(); // Reload the page
        });
      }
    } catch (error) {
      Swal.fire("Error!", response.data.message, "error");
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <CloseOutlined />
        </button>

        <h2 className="text-xl font-semibold mb-6">Edit Source</h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">

           {/* Dropdown for selecting category */}
           <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> source:
            </label>


            <select name="select"
            value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" id="">
              <option value="">Select a Option</option>
              <option value="e-GP">e-GP</option>
              <option value="Newspaper">Newspaper</option>
              <option value="Online">Online</option>
              <option value="Website">Website</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Manual">Manual</option>
            </select>


          </div>
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Edit Category Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

         


          {/* Status Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <select
              value={categoryStatus}
              onChange={(e) => setCategoryStatus(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="1">Available</option>
              <option value="0">Unavailable</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
          >
            <SendOutlined className="mr-2" /> Update
          </button>
        </form>
      </div>
    </div>
  );
}










function Source() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      const queryParams = new URLSearchParams();
      if (keyword) queryParams.append("key", keyword);
      if (type) queryParams.append("type", type);


      try {
        const response = await ApiClient.get(
          `/admin/tender-config/source?${queryParams.toString()}`
        );
        setTotalItems(response.data.total);
        if (response.data?.data) {
          setCategories(response.data.data);
          setFilteredCategories(response.data.data);
          ;

        }
      } catch (error) {
        console.error("Error fetching categories:", error);

      }
    };

    fetchCategories();
  }, [keyword, type]);

  // Add category
  const handleAddCategory = async () => {

    setIsAddModalOpen(false);
  };

  // Edit category
  const handleEditCategory = async () => {

    setIsEditModalOpen(false);
  };

  // Handle edit modal open
  const handleCategoryNameEdit = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  // Handle search
  useEffect(() => {
    const filtered = categories.filter((category) => {
      const matchesKeyword = category.name.toLowerCase().includes(keyword.toLowerCase());
      const matchesType = type ? category.status === parseInt(type) : true;
      return matchesKeyword && matchesType;
    });

    setFilteredCategories(filtered);
    setCurrentPage(1); // ফিল্টারিং করলে পেজ আবার প্রথমে আসবে
  }, [categories, keyword, type]); // যেকোনো একটিই পরিবর্তিত হলে এটি চলবে


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Source({totalItems})</h2>

      <div className="flex items-center justify-between mb-4">

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg ml-4"
        >
          Create
        </button>

        <div className="flex items-center gap-4">

          <div className="flex items-center  justify-end">
            <input
              type="text"
              placeholder="Search by Name"
              className="px-4 py-2 border border-gray-300 rounded-l-md w-[250px]"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
              <SearchOutlined />
            </button>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <p className="">status:</p>
            <select
              id="type"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-3"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All</option>
              <option value="1">Available</option>
              <option value="0">UnAvailable</option>
            </select>
          </div>

        </div>



      </div>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCategory}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={editingCategory}
        onSubmit={handleEditCategory}
      />

      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Type</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Details</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{indexOfFirstItem + index + 1}</td>
                <td className="px-4 py-2 border-b">{category.name}</td>
                <td className="px-4 py-2 border-b">{category.type}</td>
                <td className="px-4 py-2 border-b">{category.details}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs cursor-pointer ${category.status === 1
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {category.status === 1 ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleCategoryNameEdit(category)}
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

      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredCategories.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Source;