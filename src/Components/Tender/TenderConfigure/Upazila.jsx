
// import { useEffect, useState } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';

// function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange }) {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (!name || !selectedCategory) {
//       Swal.fire({
//         title: 'Validation Error',
//         text: 'Please fill in all required fields.',
//         confirmButtonText: 'Okay',
//         customClass: {
//           popup: 'w-72 h-auto p-3',
//           title: 'text-lg',
//           content: 'text-xs',
//           confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
//         },
//       });
//       return;
//     }

//     const data = {
//       name,
//       category_id: selectedCategory,
//     };

//     try {
//       const token = 'your-jwt-token-here'; // Replace with your actual token
//       const response = await ApiClient.post('/admin/tender-config/Upazila', data);
//       if (response.status === 201) {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Upazila created successfully!.',
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
//           text: 'Upazila creation failed!',
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
//         title: 'Failed!',
//         text: 'An error occurred. Please try again.',
//         confirmButtonText: 'Okay',
//         customClass: {
//           popup: 'w-72 h-auto p-3',
//           title: 'text-lg',
//           content: 'text-xs',
//           confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
//         },
//       });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
      
//           <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Upazila Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               placeholder="Enter Upazila Name"
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

// function Upazila() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("Add Upazila");
//   const [currentStatus, setCurrentStatus] = useState("Available");
//   const [editingAmenity, setEditingAmenity] = useState(null);
//   const [upazilaData, setUpazilaData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");

//   const openModal = (title, amenity) => {
//     setModalTitle(title);
//     setEditingAmenity(amenity);
//     setCurrentStatus(amenity ? amenity.status : "Available");
//     setIsModalOpen(true);
//   };

//   const handleStatusChange = (newStatus) => {
//     setCurrentStatus(newStatus);
//   };
//   useEffect(() => {
//     const fetchUpazilaData = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/upazila');
  
//         // Transform the data to make the status field readable
//         const transformedData = response.data.data.map((upazila) => ({
//           ...upazila,
//           status: upazila.status === 1 ? 'Available' : 'Unavailable', // Convert status to human-readable format
//         }));
  
//         setUpazilaData(transformedData); // Set the transformed data
     
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchUpazilaData();
//   }, []);
  

//   const filteredData = upazilaData.filter((item) => {
//     const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus ? item.status === filterStatus : true;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upazila</h2>

// <div className="flex items-center justify-between mb-4 gap-4">
// <button
//     onClick={() => openModal("Add Upazila")}
//     className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//   >
//     Create
//   </button>
//   <div className="flex items-center">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search by name"
//         className="px-4 py-2 border border-gray-300 rounded-l-md  w-[400px]"
//       />
//       <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
//         <SearchOutlined />
//       </button>
//     </div>
//     <select
//       value={filterStatus}
//       onChange={(e) => setFilterStatus(e.target.value)}
//       className="px-4 py-2 border border-gray-300 rounded-md"
//     >
//       <option value="">All</option>
//       <option value="Available">Available</option>
//       <option value="Unavailable">Unavailable</option>
//     </select>
    

 
// </div>


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
//             {filteredData.map((item, index) => (
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

// export default Upazila;



// // import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// // import ApiClient from './../../../Api/ApiClient';

// // function DesignationTypeModal({ isOpen, onClose, title, editingData }) {
// //   if (!isOpen) return null;

// //   const [name, setName] = useState(editingData ? editingData.name : '');

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Handle submit logic here
// //     console.log("Submitted Name:", name);
// //     onClose(); // Close modal after submission
// //   };

// //   useEffect(() => {
// //     if (editingData) {
// //       setName(editingData.name);
// //     }
// //   }, [editingData]);

// //   return (
// //     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
// //       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
// //         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
// //           <CloseOutlined />
// //         </button>
// //         <h2 className="text-xl font-semibold mb-6">{title}</h2>
// //         <form className="space-y-6" onSubmit={handleSubmit}>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               <span className="text-red-500">*</span> Name:
// //             </label>
// //             <input
// //               type="text"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               placeholder="Enter Name"
// //               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
// //           >
// //             <SendOutlined className="mr-2" /> Submit
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // function Upazila() {
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [modalTitle, setModalTitle] = useState("Add Upazila");
// //   const [editingData, setEditingData] = useState(null);
// //   const [upazilaData, setUpazilaData] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const openModal = (title, data = null) => {
// //     setModalTitle(title);
// //     setEditingData(data);
// //     setIsModalOpen(true);
// //   };

// //   const fetchUpazilaData = async () => {
// //     try {
// //       const response = await ApiClient.get('/admin/tender-config/upazila');
// //       setUpazilaData(response.data.data);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUpazilaData();
// //   }, []);

// //   const filteredData = upazilaData.filter((item) =>
// //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-4">
// //       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upazila</h2>
// //       <div className="flex items-center justify-between gap-4 mb-4">
// //         <button
// //           onClick={() => openModal("Add Upazila")}
// //           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
// //         >
// //           Create
// //         </button>
// //         <div className="flex items-center">
// //           <input
// //             type="text"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             placeholder="Search by name"
// //             className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
// //           />
// //           <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
// //             <SearchOutlined />
// //           </button>
// //         </div>
// //       </div>
// //       <DesignationTypeModal
// //         isOpen={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //         title={modalTitle}
// //         editingData={editingData}
// //       />
// //       <div className="flex-grow overflow-auto">
// //         <table className="w-full border-collapse border border-gray-200">
// //           <thead>
// //             <tr>
// //               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
// //               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredData.map((item, index) => (
// //               <tr key={index} className="hover:bg-gray-50">
// //                 <td className="px-4 py-2 border-b">{item.name}</td>
// //                 <td className="px-4 py-2 border-b">
// //                   <button
// //                     onClick={() => openModal(`Edit ${item.name}`, item)}
// //                     className="text-blue-500 hover:underline flex items-center"
// //                   >
// //                     <EditOutlined className="mr-1" /> Edit
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Upazila;


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
}) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/district');
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
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
        confirmButtonText: 'Okay',
        customClass: {
          popup: 'w-72 h-auto p-3',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
        },
      });
      return;
    }

    const data = {
      name,
      category_id: selectedCategory,
    };

    try {
      const token = 'your-jwt-token-here'; // Replace with your actual token
      const response = await ApiClient.post('/admin/tender-config/upazila', data);
      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Upazila created successfully!.',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'w-72 h-auto p-3',
            title: 'text-lg',
            content: 'text-xs',
            confirmButton: 'bg-blue-500 text-white px-4 py-1 text-sm rounded-md',
          },
        });
        setName('');
        setSelectedCategory('');
        onClose();
      } else {
        Swal.fire({
          title: 'Failed!',
          text: 'Upazila creation failed!',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'w-72 h-auto p-3',
            title: 'text-lg',
            content: 'text-xs',
            confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Failed!',
        text: 'An error occurred. Please try again.',
        confirmButtonText: 'Okay',
        customClass: {
          popup: 'w-72 h-auto p-3',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
        },
      });
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
              <span className="text-red-500">*</span> Upazila Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Upazila Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> District Name:
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="" disabled>Select a District</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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

function Upazila() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Designation Type');
  const [currentStatus, setCurrentStatus] = useState('Available');
  const [Upazila, setUpazila] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (title, Upazila) => {
    setModalTitle(title);
    setCurrentStatus(Upazila ? Upazila.status : 'Available');
    setIsModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchUpazilaData = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/upazila');
        setUpazila(response.data.data);
        // console.log (response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUpazilaData();
  }, []);

  const filteredUpazilas = Upazila.filter(amenity => 
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upazila</h2>

      {/* Create button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => openModal('Add Upazila')}
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
            placeholder="Search Upazilas"
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
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUpazilas.map((Upazila, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{Upazila.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      Upazila.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {Upazila.status === 1 ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openModal(`Edit ${Upazila.name}`, Upazila)}
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

export default Upazila;


