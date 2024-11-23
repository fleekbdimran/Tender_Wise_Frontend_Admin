
// import React, { useState, useEffect } from "react";
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from "@ant-design/icons";
// import ApiClient from "../../../Api/ApiClient";

// function DesignationTypeModal({ isOpen, onClose, title, onSubmit, division }) {
//   const [divisionName, setdivisionName] = useState(division ? division.name : "");

//   useEffect(() => {
//     if (division) {
//       setdivisionName(division.name);
//     }
//   }, [division]);

//   if (!isOpen) return null;

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(divisionName, division?.id); // Pass name and ID for edit
//     setdivisionName(""); // Reset input
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         >
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form onSubmit={handleFormSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Name:
//             </label>
//             <input
//               type="text"
//               value={divisionName}
//               onChange={(e) => setdivisionName(e.target.value)}
//               placeholder="Enter division Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
//           >
//             <SendOutlined className="mr-2" /> {division ? "Update" : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function Division() {
//   const [categories, setCategories] = useState([]);
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // State for the search term
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("Add division");
//   const [editingdivision, setEditingdivision] = useState(null);

//   const fetchCategories = async () => {
//     try {
//       const response = await ApiClient.get("/admin/tender-config/division", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer YOUR_TOKEN_HERE`,
//         },
//       });
//       setCategories(response.data.data);
//       setFilteredCategories(response.data.data); // Initially show all categories
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleAdddivision = async (name) => {
//     try {
//       await ApiClient.post(
//         "/admin/tender-config/division",
//         { name },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer YOUR_TOKEN_HERE`,
//           },
//         }
//       );
//       setIsModalOpen(false);
//       fetchCategories();
//     } catch (error) {
//       console.error("Error adding division:", error);
//     }
//   };

//   const handleEditdivision = async (name, id) => {
//     try {
//       await ApiClient.patch(
//         `/admin/tender-config/division/${id}`,
//         { name },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer YOUR_TOKEN_HERE`,
//           },
//         }
//       );
//       setIsModalOpen(false);
//       fetchCategories();
//     } catch (error) {
//       console.error("Error editing division:", error);
//     }
//   };

//   const handledivisionNameEdit = (division) => {
//     setModalTitle("Edit division");
//     setEditingdivision(division);
//     setIsModalOpen(true);
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     // Filter categories based on the search term
//     const filtered = categories.filter((division) =>
//       division.name.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredCategories(filtered);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Division</h2>

//       <div className="flex items-center justify-between mb-4">
//         {/* Create Button */}
//         <button
//           onClick={() => {
//             setModalTitle("Add division");
//             setEditingdivision(null);
//             setIsModalOpen(true);
//           }}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg ml-4"
//         >
//           Create
//         </button>
//         {/* Search Bar */}
//         <div className="flex items-center mb-4 justify-end">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search categories"
//             className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
//           />
//           <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
//             <SearchOutlined />
//           </button>
//         </div>
//       </div>

//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         division={editingdivision}
//         onSubmit={editingdivision ? handleEditdivision : handleAdddivision}
//       />

//       <div className="flex-grow overflow-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
//                 Name
//               </th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
//                 Status
//               </th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCategories.map((division, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">
//                   <span
//                     onClick={() => handledivisionNameEdit(division)}
//                     className="text-blue-500 hover:underline cursor-pointer"
//                   >
//                     {division.name}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       division.status === 1
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {division.status === 1 ? "Available" : "Unavailable"}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <button
//                     onClick={() => handledivisionNameEdit(division)}
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

// export default Division;



import React, { useState, useEffect } from "react";
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from "@ant-design/icons";
import ApiClient from "../../../Api/ApiClient";

function DesignationTypeModal({ isOpen, onClose, title, onSubmit, division }) {
  const [divisionName, setdivisionName] = useState(division ? division.name : "");

  useEffect(() => {
    if (division) {
      setdivisionName(division.name);
    }
  }, [division]);

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(divisionName, division?.id); // Pass name and ID for edit
    setdivisionName(""); // Reset input
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <CloseOutlined />
        </button>
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              value={divisionName}
              onChange={(e) => setdivisionName(e.target.value)}
              placeholder="Enter division Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
          >
            <SendOutlined className="mr-2" /> {division ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Division() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add division");
  const [editingdivision, setEditingdivision] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchCategories = async () => {
    try {
      const response = await ApiClient.get("/admin/tender-config/division", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_TOKEN_HERE`,
        },
      });
      setCategories(response.data.data);
      setFilteredCategories(response.data.data); // Initially show all categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAdddivision = async (name) => {
    try {
      await ApiClient.post(
        "/admin/tender-config/division",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
        }
      );
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding division:", error);
    }
  };

  const handleEditdivision = async (name, id) => {
    try {
      await ApiClient.patch(
        `/admin/tender-config/division/${id}`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
        }
      );
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error editing division:", error);
    }
  };

  const handledivisionNameEdit = (division) => {
    setModalTitle("Edit division");
    setEditingdivision(division);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter categories based on the search term
    const filtered = categories.filter((division) =>
      division.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedData = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Division</h2>

      <div className="flex items-center justify-between mb-4">
        {/* Create Button */}
        <button
          onClick={() => {
            setModalTitle("Add division");
            setEditingdivision(null);
            setIsModalOpen(true);
          }}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg ml-4"
        >
          Create
        </button>
        {/* Search Bar */}
        <div className="flex items-center mb-4 justify-end">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search categories"
            className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
            <SearchOutlined />
          </button>
        </div>
      </div>

      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        division={editingdivision}
        onSubmit={editingdivision ? handleEditdivision : handleAdddivision}
      />

      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
                ID
              </th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
                Name
              </th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
                Status
              </th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((division, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 border-b">
                  <span
                    onClick={() => handledivisionNameEdit(division)}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    {division.name}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      division.status === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {division.status === 1 ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handledivisionNameEdit(division)}
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

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === i + 1 ? "bg-teal-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Division;
