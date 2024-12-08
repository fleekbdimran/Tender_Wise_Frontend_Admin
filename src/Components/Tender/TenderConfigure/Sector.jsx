
// 08-12-24
// function DesignationTypeModal({
//   isOpen,
//   onClose,
//   title,
//   currentStatus,
//   onStatusChange,
// }) {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/category');
//         if (response.data.success) {
//           const filteredCategories = response.data.data.filter(
//             category => category.status === 1
//           );
//           setCategories(filteredCategories);
//         }
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);
//       }


//     };
//     fetchCategories();
//   }, []);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (!name || !selectedCategory) {
//       await Swal.fire({
//         title: "Success!",
//         text: "Sector created successfully!",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     const data = {
//       name,
//       category_id: selectedCategory,
//     };

//     try {
//       const token = 'your-jwt-token-here'; // Replace with your actual token
//       const response = await ApiClient.post('/admin/tender-config/sector', data);
//       if (response.status === 201) {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Sector created successfully!.',
//           confirmButtonText: 'Okay',
//           customClass: {
//             popup: 'w-72 h-auto p-3',
//             title: 'text-lg',
//             content: 'text-xs',
//             confirmButton: 'bg-blue-500 text-white px-4 py-1 text-sm rounded-md',
//           },
//         });
//         setName('');
//         setSelectedCategory('');
//         onClose();
//       } else {
//         Swal.fire({
//           title: 'Failed!',
//           text: 'Sector creation failed!',
//           confirmButtonText: 'Okay',
//           customClass: {
//             popup: 'w-72 h-auto p-3',
//             title: 'text-lg',
//             content: 'text-xs',
//             confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
//           },
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error!",
//         text: error.response?.data?.message || "Something went wrong!",
//         icon: "error",
//         confirmButtonText: "Try Again",
//       });
//     }
//   };

//   if (!isOpen) return null;

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
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Sector Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               placeholder="Enter Sector Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Category Name:
//             </label>
//             <select
//               value={selectedCategory}
//               onChange={e => setSelectedCategory(e.target.value)}
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             >
//               <option value="" disabled>Select a category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
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



import { useEffect, useState } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
import ApiClient from './../../../Api/ApiClient';
import Swal from 'sweetalert2';



function SubDepartment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentSubDepartment, setCurrentSubDepartment] = useState(null);
  const [subDepartments, setSubDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSubDepartments = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/sub-department');
        if (response.data.success) {
          setSubDepartments(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching sub-departments:', error);
      }
    };

    fetchSubDepartments();
  }, []);

  const handleModalOpen = (title, subDepartment = null) => {
    setModalTitle(title);
    setCurrentSubDepartment(subDepartment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentSubDepartment(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      const url = currentSubDepartment
        ? `/admin/tender-config/sub-department/${currentSubDepartment.id}`
        : '/admin/tender-config/sub-department';
      const method = currentSubDepartment ? 'patch' : 'post';

      const response = await ApiClient[method](url, data);
      if (response.data.success) {
        Swal.fire('Success!', `Sub-Department ${currentSubDepartment ? 'updated' : 'created'} successfully.`, 'success');
        handleModalClose();
        // Re-fetch the list of sub-departments
        const updatedSubDepartments = await ApiClient.get('/admin/tender-config/sub-department');
        setSubDepartments(updatedSubDepartments.data.data);
      } else {
        Swal.fire('Error!', 'Failed to save changes.', 'error');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredSubDepartments = subDepartments.filter((subDept) =>
    subDept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedSubDepartments = filteredSubDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sub Departments</h2>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleModalOpen('Add SubDepartment')}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg"
        >
          Create
        </button>

        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search SubDepartments"
            className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
            <SearchOutlined />
          </button>
        </div>
      </div>

      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        currentSubDepartment={currentSubDepartment}
        onSubmit={handleFormSubmit}
      />

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
            {paginatedSubDepartments.map((subDept, index) => (
              <tr key={subDept.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1 }</td>
                <td className="px-4 py-2 border-b">{subDept.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      subDept.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {subDept.status === 1 ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleModalOpen(`Edit ${subDept.name}`, subDept)}
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

function DesignationTypeModal({
  isOpen,
  onClose,
  title,
  // currentStatus,
  onStatusChange,
}) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [availability, setAvailability] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/category');
        if (response.data.success) {
          const filteredCategories = response.data.data.filter(
            category => category.status === 1
          );
          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name || !selectedCategory) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const data = {
      name,
      category_id: selectedCategory,
    };

    try {
      const response = await ApiClient.post('/admin/tender-config/sector', data);
      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: "Success!",
          text: "Sector created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        // fetchCategories(); // Refresh the category list
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      setIsModalOpen(false); // Close modal after submit
    }
    
  };

  if (!isOpen) return null;

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
        <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Category Name:
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Sector Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Sector Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Availability:
            </label>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)} // Updated to dynamically set the current status
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
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


function Sector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Designation Type');
  const [currentStatus, setCurrentStatus] = useState('Available');
  const [sector, setSector] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openModal = (title, sector) => {
    setModalTitle(title);
    setCurrentStatus(sector ? sector.status : 'Available');
    setIsModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/sector');
        setSector(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    
    };




    fetchSectorData();
  }, [sector]);

  const filteredSectors = sector.filter(amenity =>
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSectors.length / itemsPerPage);
  const paginatedSectors = filteredSectors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sector</h2>

      {/* Create button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => openModal('Add Sector')}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg"
        >
          Create
        </button>

        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search sectors"
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
        currentStatus={currentStatus}
      />

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
            {paginatedSectors.map((sector, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index+1}</td>
                <td className="px-4 py-2 border-b">{sector.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${sector.sector_status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {sector.sector_status === 1 ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  
                  <button
                    onClick={() => openModal(`Edit ${sector.name}`, sector)}
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
     
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'} rounded-md mx-1`}
          >
            {index + 1}
          </button>
        ))}
   
      </div>
    </div>
  );
}

export default Sector;


