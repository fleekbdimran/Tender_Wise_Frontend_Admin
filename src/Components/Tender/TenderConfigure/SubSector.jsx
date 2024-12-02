
// import { useEffect, useState } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';
// import Swal from 'sweetalert2';

// function DesignationTypeModal({
//   isOpen,
//   onClose,
//   title,
//   currentStatus,
//   onStatusChange,
//   updateSubSector,
//   sectorData,
// }) {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState(sectorData?.name || '');
//   const [selectedSubCategory, setSelectedSubCategory] = useState(sectorData?.sector_id || '');

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/sector');
//         if (response.data.success) {
//           const filteredCategories = response.data.data.filter(
//             (category) => category.sector_status === 1
//           );
//           setCategories(filteredCategories);
//         }
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);
//       }
//     };

//     fetchSubCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !selectedSubCategory) {
//       Swal.fire({
//         title: 'Validation Error',
//         text: 'Please fill in all required fields.',
//         confirmButtonText: 'Okay',
//       });
//       return;
//     }

//     const data = {
//       name,
//       sector_id: selectedSubCategory,
//     };

//     try {
//       if (sectorData) {
//         // If it's an update
//         const response = await ApiClient.patch(`/admin/tender-config/sub-sector/${sectorData.id}`, data);
//         if (response.status === 200) {
//           Swal.fire({
//             title: 'Success!',
//             text: 'Sub sector updated successfully!',
//             confirmButtonText: 'Okay',
//           });
//           updateSubSector(sectorData.id, data); // Update the state in SubSector
//         }
//       } else {
//         // If it's a create
//         const response = await ApiClient.post('/admin/tender-config/sub-sector', data);
//         if (response.status === 201) {
//           Swal.fire({
//             title: 'Success!',
//             text: 'Sub sector created successfully!',
//             confirmButtonText: 'Okay',
//           });
//           setName('');
//           setSelectedSubCategory('');
//           onClose();
//         } else {
//           Swal.fire({
//             title: 'Failed!',
//             text: 'Sector creation failed.',
//             confirmButtonText: 'Okay',
//           });
//         }
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Failed!',
//         text: 'Error occurred while saving data.',
//         confirmButtonText: 'Okay',
//       });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Sub Sector Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter sector name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Sector Name:
//             </label>
//             <select
//               value={selectedSubCategory}
//               onChange={(e) => setSelectedSubCategory(e.target.value)}
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
//             >
//               <option value="" disabled>
//                 Select a Sector
//               </option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit" className="bg-teal-500 text-white px-6 py-3 rounded-lg w-full">
//             <SendOutlined className="mr-2" /> Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function SubSector() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add SubSector');
//   const [subSector, setSubSector] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentSectorData, setCurrentSectorData] = useState(null);

//   useEffect(() => {
//     const fetchSubSectorData = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/sub-sector');
//         setSubSector(response.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchSubSectorData();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredSubSector = subSector.filter((amenity) =>
//     amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const updateSubSector = (subSectorId, updatedData) => {
//     const updatedSubSectorList = subSector.map((item) =>
//       item.id === subSectorId ? { ...item, ...updatedData } : item
//     );
//     setSubSector(updatedSubSectorList);
//   };

//   const handleEditClick = (sectorData) => {
//     setCurrentSectorData(sectorData);
//     setModalTitle('Edit SubSector');
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sub Sector</h2>

//       <div className="flex justify-between items-center mb-4 w-full">
//         <button
//           onClick={() => {
//             setCurrentSectorData(null); // Clear current data when creating a new sub-sector
//             setModalTitle('Add SubSector');
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
//             onChange={handleSearchChange}
//             placeholder="Search categories"
//             className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
//           />
//           <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
//             <SearchOutlined />
//           </button>
//         </div>
//       </div>

//       {/* Modal for creating or editing sub-sector */}
//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         sectorData={currentSectorData}
//         updateSubSector={updateSubSector}
//       />

//       {/* Table displaying the sub-sectors */}
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
//             {filteredSubSector.map((amenity, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{amenity.name}</td>
//                 <td className="px-4 py-2 border-b">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       amenity.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                     }`}
//                   >
//                     {amenity.status === 1 ? 'Available' : 'Unavailable'}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <button
//                     onClick={() => handleEditClick(amenity)}
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

// export default SubSector;


// import { useEffect, useState } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';
// import Swal from 'sweetalert2';

// function DesignationTypeModal({
//   isOpen,
//   onClose,
//   title,
//   currentStatus,
//   onStatusChange,
//   updateSubSector,
//   sectorData,
// }) {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState(sectorData?.name || '');
//   const [selectedSubCategory, setSelectedSubCategory] = useState(sectorData?.sector_id || '');

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/sector');
//         if (response.data.success) {
//           const filteredCategories = response.data.data.filter(
//             (category) => category.sector_status === 1
//           );
//           setCategories(filteredCategories);
//         }
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);
//       }
//     };

//     fetchSubCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !selectedSubCategory) {
//       Swal.fire({
//         title: 'Validation Error',
//         text: 'Please fill in all required fields.',
//         confirmButtonText: 'Okay',
//       });
//       return;
//     }

//     const data = {
//       name,
//       sector_id: selectedSubCategory,
//     };

//     try {
//       if (sectorData) {
//         // If it's an update
//         const response = await ApiClient.patch(`/admin/tender-config/sub-sector/${sectorData.id}`, data);
//         if (response.status === 200) {
//           Swal.fire({
//             title: 'Success!',
//             text: 'Sub sector updated successfully!',
//             confirmButtonText: 'Okay',
//           });
//           updateSubSector(sectorData.id, data); // Update the state in SubSector
//         }
//       } else {
//         // If it's a create
//         const response = await ApiClient.post('/admin/tender-config/sub-sector', data);
//         if (response.status === 201) {
//           Swal.fire({
//             title: 'Success!',
//             text: 'Sub sector created successfully!',
//             confirmButtonText: 'Okay',
//           });
//           setName('');
//           setSelectedSubCategory('');
//           onClose();
//         } else {
//           Swal.fire({
//             title: 'Failed!',
//             text: 'Sector creation failed.',
//             confirmButtonText: 'Okay',
//           });
//         }
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Failed!',
//         text: 'Error occurred while saving data.',
//         confirmButtonText: 'Okay',
//       });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Sub Sector Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter sector name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Sector Name:
//             </label>
//             <select
//               value={selectedSubCategory}
//               onChange={(e) => setSelectedSubCategory(e.target.value)}
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
//             >
//               <option value="" disabled>
//                 Select a Sector
//               </option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit" className="bg-teal-500 text-white px-6 py-3 rounded-lg w-full">
//             <SendOutlined className="mr-2" /> Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function SubSector() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add SubSector');
//   const [subSector, setSubSector] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentSectorData, setCurrentSectorData] = useState(null);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchSubSectorData = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/sub-sector');
//         setSubSector(response.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchSubSectorData();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredSubSector = subSector.filter((amenity) =>
//     amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const updateSubSector = (subSectorId, updatedData) => {
//     const updatedSubSectorList = subSector.map((item) =>
//       item.id === subSectorId ? { ...item, ...updatedData } : item
//     );
//     setSubSector(updatedSubSectorList);
//   };

//   const handleEditClick = (sectorData) => {
//     setCurrentSectorData(sectorData);
//     setModalTitle('Edit SubSector');
//     setIsModalOpen(true);
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(filteredSubSector.length / itemsPerPage);
//   const paginatedSubSectors = filteredSubSector.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sub Sector</h2>

//       <div className="flex justify-between items-center mb-4 w-full">
//         <button
//           onClick={() => {
//             setCurrentSectorData(null); // Clear current data when creating a new sub-sector
//             setModalTitle('Add SubSector');
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
//             onChange={handleSearchChange}
//             placeholder="Search categories"
//             className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
//           />
//           <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
//             <SearchOutlined />
//           </button>
//         </div>
//       </div>

//       {/* Modal for creating or editing sub-sector */}
//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         sectorData={currentSectorData}
//         updateSubSector={updateSubSector}
//       />

//       {/* Table displaying the sub-sectors */}
//       <div className="flex-grow overflow-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedSubSectors.map((amenity, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{index + 1}</td>
//                 <td className="px-4 py-2 border-b">{amenity.name}</td>
//                 <td className="px-4 py-2 border-b">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       amenity.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                     }`}
//                   >
//                     {amenity.status === 1 ? 'Available' : 'Unavailable'}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <button
//                     onClick={() => handleEditClick(amenity)}
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

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4">
//         {/* <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-teal-500 text-white rounded-l-md"
//         >
//           Prev
//         </button> */}
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             className={`px-4 py-2 ${
//               currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'
//             } rounded-md mx-1`}
//           >
//             {index + 1}
//           </button>
//         ))}
//         {/* <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-teal-500 text-white rounded-r-md"
//         >
//           Next
//         </button> */}
//       </div>
//     </div>
//   );
// }

// export default SubSector;


import { useEffect, useState } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
import ApiClient from './../../../Api/ApiClient';
import Swal from 'sweetalert2';

function DesignationTypeModal({
  isOpen,
  onClose,
  title,
  currentStatus,
  onStatusChange,
  updateSubSector,
  sectorData,
}) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(sectorData?.name || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState(sectorData?.sector_id || '');

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/sector');
        if (response.data.success) {
          const filteredCategories = response.data.data.filter(
            (category) => category.sector_status === 1
          );
          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !selectedSubCategory) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
        confirmButtonText: 'Okay',
      });
      return;
    }

    const data = {
      name,
      sector_id: selectedSubCategory,
    };

    try {
      if (sectorData) {
        // If it's an update
        const response = await ApiClient.patch(`/admin/tender-config/sub-sector/${sectorData.id}`, data);
        if (response.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Sub sector updated successfully!',
            confirmButtonText: 'Okay',
            customClass: {
              popup: 'w-72 h-auto p-3',
              title: 'text-lg',
              content: 'text-xs',
              confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
            },
          });
          updateSubSector(sectorData.id, data); // Update the state in SubSector
          setName(''); // Reset the form after successful update
          setSelectedSubCategory(''); // Reset the category selection
          onClose(); // Close the modal
        }
      } else {
        // If it's a create
        const response = await ApiClient.post('/admin/tender-config/sub-sector', data);
        if (response.status === 201) {
          Swal.fire({
            title: 'Success!',
            text: 'Sub sector created successfully!',
            confirmButtonText: 'Okay',
            customClass: {
              popup: 'w-72 h-auto p-3',
              title: 'text-lg',
              content: 'text-xs',
              confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
            },
          });
          setName(''); // Reset the form after successful creation
          setSelectedSubCategory(''); // Reset the category selection
          onClose(); // Close the modal
        } else {
          Swal.fire({
            title: 'Failed!',
            text: 'Sector creation failed.',
            confirmButtonText: 'Okay',
            customClass: {
              popup: 'w-72 h-auto p-3',
              title: 'text-lg',
              content: 'text-xs',
              confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
            },
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Failed!',
        text: 'Error occurred while saving data.',
        confirmButtonText: 'Okay',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          <CloseOutlined />
        </button>
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Sub Sector Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter sector name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Sector Name:
            </label>
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select a Sector
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-teal-500 text-white px-6 py-3 rounded-lg w-full">
            <SendOutlined className="mr-2" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function SubSector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add SubSector');
  const [subSector, setSubSector] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSectorData, setCurrentSectorData] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSubSectorData = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/sub-sector');
        setSubSector(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSubSectorData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSubSector = subSector.filter((amenity) =>
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateSubSector = (subSectorId, updatedData) => {
    const updatedSubSectorList = subSector.map((item) =>
      item.id === subSectorId ? { ...item, ...updatedData } : item
    );
    setSubSector(updatedSubSectorList);
  };

  const handleEditClick = (sectorData) => {
    setCurrentSectorData(sectorData);
    setModalTitle('Edit SubSector');
    setIsModalOpen(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredSubSector.length / itemsPerPage);
  const paginatedSubSectors = filteredSubSector.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sub Sector</h2>

      <div className="flex justify-between items-center mb-4 w-full">
        <button
          onClick={() => {
            setCurrentSectorData(null); // Clear current data when creating a new sub-sector
            setModalTitle('Add SubSector');
            setIsModalOpen(true);
          }}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg"
        >
          Create
        </button>

        <div className="flex items-center">
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

      {/* Modal for creating or editing sub-sector */}
      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        sectorData={currentSectorData}
        updateSubSector={updateSubSector}
      />

      {/* Table displaying the sub-sectors */}
      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSubSectors.map((amenity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{amenity.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      amenity.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {amenity.status === 1 ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEditClick(amenity)}
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'
            } rounded-md mx-1`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SubSector;
