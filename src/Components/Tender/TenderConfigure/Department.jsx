// import { useState, useEffect } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';

// function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange }) {
//   if (!isOpen) return null;

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
//               placeholder="Enter Department Name"
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

// function Department() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add Designation Type');
//   const [currentStatus, setCurrentStatus] = useState('Available');
//   const [editingAmenity, setEditingAmenity] = useState(null);
//   const [tenderDepartment, setTenderDepartment] = useState([]);

//   // Fetch the department data from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/department');
//         setTenderDepartment(response.data.data); // Update the state with the fetched department data
//         console.log(response.data); // Log the response to the console for debugging
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Open modal to add or edit department status
//   const openModal = (title, department) => {
//     setModalTitle(title);
//     setEditingAmenity(department);
//     setCurrentStatus(department ? department.status : 'Available'); // Set the current status to match the selected department
//     setIsModalOpen(true);
//   };

//   // Handle the status change inside the modal
//   const handleStatusChange = (newStatus) => {
//     setCurrentStatus(newStatus);
//   };

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Department</h2>

//       {/* Button to create new department */}
//       <button onClick={() => openModal('Add Designation Type')} className="bg-teal-500 text-white px-7 py-3 rounded-lg self-start">
//         Create
//       </button>

//       {/* Modal for adding or editing department status */}
//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
//         onStatusChange={handleStatusChange}
//       />

//       {/* Table displaying the list of departments */}
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
//             {tenderDepartment.map((department, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{department.name}</td>
//                 <td className="px-4 py-2 border-b">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${department.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
//                   >
//                     {department.department_status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <button onClick={() => openModal(`Edit ${department.name}`, department)} className="text-blue-500 hover:underline flex items-center">
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

// export default Department;



// import { useState, useEffect } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';

// function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange }) {
//   if (!isOpen) return null;

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
//               placeholder="Enter Department Name"
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

// function Department() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add Designation Type');
//   const [currentStatus, setCurrentStatus] = useState('Available');
//   const [editingAmenity, setEditingAmenity] = useState(null);
//   const [tenderDepartment, setTenderDepartment] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // State to track the search input

//   // Fetch the department data from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/department');
//         setTenderDepartment(response.data.data); // Update the state with the fetched department data
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Open modal to add or edit department status
//   const openModal = (title, department) => {
//     setModalTitle(title);
//     setEditingAmenity(department);
//     setCurrentStatus(department ? department.status : 'Available');
//     setIsModalOpen(true);
//   };

//   // Handle the status change inside the modal
//   const handleStatusChange = (newStatus) => {
//     setCurrentStatus(newStatus);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter the departments based on the search term
//   const filteredDepartments = tenderDepartment.filter(department =>
//     department.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Department</h2>
      
//        {/* Container for Create button and Search bar */}
// <div className="flex items-center justify-between mb-4 w-full">
//   {/* Button to create new department */}
//   <button
//     onClick={() => openModal('Add Designation Type')}
//     className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//   >
//     Create
//   </button>

//   {/* Search Bar with Search Icon */}
//   <div className="flex items-center  max-w-lg">
//     <input
//       type="text"
//       value={searchTerm}
//       onChange={handleSearchChange}
//       placeholder="Search categories"
//       className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
//     />
//     <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
//       <SearchOutlined />
//     </button>
//   </div>
// </div>


    

//       {/* Modal for adding or editing department status */}
//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
//         onStatusChange={handleStatusChange}
//       />

//       {/* Table displaying the list of departments */}
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
//             {filteredDepartments.length > 0 ? (
//               filteredDepartments.map((department, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border-b">{department.name}</td>
//                   <td className="px-4 py-2 border-b">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${department.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
//                     >
//                       {department.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     <button onClick={() => openModal(`Edit ${department.name}`, department)} className="text-blue-500 hover:underline flex items-center">
//                       <EditOutlined className="mr-1" /> Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center py-4">No matching departments found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Department;


// import { useState, useEffect } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';

// function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange }) {
//   if (!isOpen) return null;

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
//               placeholder="Enter Department Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>

//           <div className="flex justify-center mt-4">
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="1"
//                 checked={currentStatus === '1'}
//                 onChange={handleRadioChange}
//                 className="mr-2"
//               />
//               Available
//             </label>
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="0"
//                 checked={currentStatus === '0'}
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

// function Department() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add Designation Type');
//   const [currentStatus, setCurrentStatus] = useState('1'); // Default to Available (1)
//   const [editingAmenity, setEditingAmenity] = useState(null);
//   const [tenderDepartment, setTenderDepartment] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // State to track the search input

//   // Fetch the department data from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/department');
//         setTenderDepartment(response.data.data); // Update the state with the fetched department data
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Open modal to add or edit department status
//   const openModal = (title, department) => {
//     setModalTitle(title);
//     setEditingAmenity(department);
//     setCurrentStatus(department ? department.status : '1'); // Default to Available if no department
//     setIsModalOpen(true);
//   };

//   // Handle the status change inside the modal
//   const handleStatusChange = (newStatus) => {
//     setCurrentStatus(newStatus);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter the departments based on the search term
//   const filteredDepartments = tenderDepartment.filter(department =>
//     department.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Department</h2>

//       {/* Container for Create button and Search bar */}
//       <div className="flex items-center justify-between mb-4 w-full">
//         {/* Button to create new department */}
//         <button
//           onClick={() => openModal('Add Designation Type')}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//         >
//           Create
//         </button>

//         {/* Search Bar with Search Icon */}
//         <div className="flex items-center max-w-lg">
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

//       {/* Modal for adding or editing department status */}
//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
//         onStatusChange={handleStatusChange}
//       />

//       {/* Table displaying the list of departments */}
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
//             {filteredDepartments.length > 0 ? (
//               filteredDepartments.map((department, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border-b">{department.name}</td>
//                   <td className="px-4 py-2 border-b">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         department.status === '1' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                       }`}
//                     >
//                       {department.status === '1' ? 'Available' : 'Unavailable'}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     <button
//                       onClick={() => openModal(`Edit ${department.name}`, department)}
//                       className="text-blue-500 hover:underline flex items-center"
//                     >
//                       <EditOutlined className="mr-1" /> Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center py-4">No matching departments found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Department;



// import { useState, useEffect } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';

// function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange, onSubmit }) {
//   if (!isOpen) return null;

//   const [name, setName] = useState('');

//   const handleRadioChange = (e) => {
//     onStatusChange(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = { name, status: currentStatus };
//     onSubmit(data); // Call the onSubmit handler passed as prop
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter Department Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>

//           <div className="flex justify-center mt-4">
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="1"
//                 checked={currentStatus === '1'}
//                 onChange={handleRadioChange}
//                 className="mr-2"
//               />
//               Available
//             </label>
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="0"
//                 checked={currentStatus === '0'}
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

// function Department() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add Designation Type');
//   const [currentStatus, setCurrentStatus] = useState('1'); // Default to Available (1)
//   const [editingDepartment, setEditingDepartment] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // State to track the search input

//   // Fetch the department data from API
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/department');
//         setDepartments(response.data.data); // Update the state with the fetched department data
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Open modal to add or edit department status
//   const openModal = (title, department) => {
//     setModalTitle(title);
//     setEditingDepartment(department);
//     setCurrentStatus(department ? department.status : '1'); // Default to Available if no department
//     setIsModalOpen(true);
//   };

//   // Handle the status change inside the modal
//   const handleStatusChange = (newStatus) => {
//     setCurrentStatus(newStatus);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter the departments based on the search term
//   const filteredDepartments = departments.filter(department =>
//     department.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle form submission to create or update department
//   const handleSubmit = async (data) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", "Bearer YOUR_ACCESS_TOKEN");

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: JSON.stringify(data),
//       redirect: 'follow',
//     };

//     try {
//       let response;
//       if (editingDepartment) {
//         // Update existing department
//         response = await fetch(`http://192.168.0.229:9009/api/v1/admin/tender-config/department/${editingDepartment.id}`, {
//           method: 'PUT',
//           headers: myHeaders,
//           body: JSON.stringify(data),
//           redirect: 'follow',
//         });
//       } else {
//         // Create new department
//         response = await fetch("http://192.168.0.229:9009/api/v1/admin/tender-config/department", requestOptions);
//       }

//       const result = await response.json();
//       if (response.ok) {
//         setIsModalOpen(false);
//         setEditingDepartment(null);
//         setCurrentStatus('1'); // Reset status to Available
//         setDepartments(prev => [...prev, result.data]); // Add new or updated department to state
//       } else {
//         console.error('Error creating/updating department:', result);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Department</h2>

//       {/* Container for Create button and Search bar */}
//       <div className="flex items-center justify-between mb-4 w-full">
//         {/* Button to create new department */}
//         <button
//           onClick={() => openModal('Add Department')}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//         >
//           Create
//         </button>

//         {/* Search Bar with Search Icon */}
//         <div className="flex items-center max-w-lg">
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

//       {/* Modal for adding or editing department status */}
//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
//         onStatusChange={handleStatusChange}
//         onSubmit={handleSubmit}
//       />

//       {/* Table displaying the list of departments */}
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
//             {filteredDepartments.length > 0 ? (
//               filteredDepartments.map((department, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border-b">{department.name}</td>
//                   <td className="px-4 py-2 border-b">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${department.status === '1' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
//                     >
//                       {department.status === '1' ? 'Available' : 'Unavailable'}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     <button
//                       onClick={() => openModal(`Edit ${department.name}`, department)}
//                       className="text-blue-500 hover:underline flex items-center"
//                     >
//                       <EditOutlined className="mr-1" /> Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="text-center py-4">No matching departments found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Department;

// import { useEffect, useState } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';
// import Swal from 'sweetalert2';

// function DepartmentTypeModal({
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
//       const response = await ApiClient.post('/admin/tender-config/department', data);
//       if (response.status === 201) {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Department created successfully!.',
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
//           text: 'Department creation failed!',
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
//               <span className="text-red-500">*</span> Department Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               placeholder="Enter Department Name"
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

// function Department() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add Department');
//   const [currentStatus, setCurrentStatus] = useState('Available');
//   const [department, setDepartment] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const openModal = (title, department) => {
//     setModalTitle(title);
//     setCurrentStatus(department ? department.status : 'Available');
//     setIsModalOpen(true);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   useEffect(() => {
//     const fetchDepartmentData = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/department');
//         setDepartment(response.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchDepartmentData();
//   }, []);

//   const filteredDepartments = department.filter(departmentItem => 
//     departmentItem.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Department</h2>

//       {/* Create button */}
//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => openModal('Add Department')}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//         >
//           Create
//         </button>

//         {/* Search Bar */}
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search departments"
//             className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
//           />
//           <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
//             <SearchOutlined />
//           </button>
//         </div>
//       </div>

//       <DepartmentTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
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
//             {filteredDepartments.map((departmentItem, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{departmentItem.name}</td>
//                 <td className="px-4 py-2 border-b">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${departmentItem.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
//                   >
//                     {departmentItem.status === 1 ? 'Available' : 'Unavailable'}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <button
//                     onClick={() => openModal(`Edit ${departmentItem.name}`, departmentItem)}
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

// export default Department;



import { useEffect, useState } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

function DepartmentTypeModal({
  isOpen,
  onClose,
  title,
  currentStatus,
  onStatusChange,
}) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch categories on modal open
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://192.168.0.229:9009/api/v1/admin/tender-config/category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXFiYWwiLCJlbWFpbCI6ImlxYmFsLmZsZWVrYmQ4NUBnbWFpbC5jb20iLCJwaG9uZSI6IjAxOTk2MTA1MDIwIiwic3RhdHVzIjoxLCJ1cGRhdGVkX2J5Ijo2LCJpZCI6NiwidHlwZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNzMxODMzNzg0LCJleHAiOjE3MzE5MjAxODR9.rq79EvXz-fxQuUp-zW-Q2fWp2hNuh1BqsCqudO0icwA',
          },
        });
        const data = await response.json();
        if (data.success) {
          const filteredCategories = data.data.filter(
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

  // Handle form submit
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

    // Send POST request to create a department
    try {
      const response = await fetch('http://192.168.0.229:9009/api/v1/admin/tender-config/department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXFiYWwiLCJlbWFpbCI6ImlxYmFsLmZsZWVrYmQ4NUBnbWFpbC5jb20iLCJwaG9uZSI6IjAxOTk2MTA1MDIwIiwic3RhdHVzIjoxLCJ1cGRhdGVkX2J5Ijo2LCJpZCI6NiwidHlwZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNzMxODMzNzg0LCJleHAiOjE3MzE5MjAxODR9.rq79EvXz-fxQuUp-zW-Q2fWp2hNuh1BqsCqudO0icwA',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Department created successfully!',
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
          text: 'Department creation failed!',
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
              <span className="text-red-500">*</span> Department Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Department Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
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

function Department() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Department');
  const [currentStatus, setCurrentStatus] = useState('Available');
  const [department, setDepartment] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (title, department) => {
    setModalTitle(title);
    setCurrentStatus(department ? department.status : 'Available');
    setIsModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch department data
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch('http://192.168.0.229:9009/api/v1/admin/tender-config/department?key=President\'s Office&excluded_id=2', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXFiYWwiLCJlbWFpbCI6ImlxYmFsLmZsZWVrYmQ4NUBnbWFpbC5jb20iLCJwaG9uZSI6IjAxOTk2MTA1MDIwIiwic3RhdHVzIjoxLCJ1cGRhdGVkX2J5Ijo2LCJpZCI6NiwidHlwZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNzMxODMzNzg0LCJleHAiOjE3MzE5MjAxODR9.rq79EvXz-fxQuUp-zW-Q2fWp2hNuh1BqsCqudO0icwA',
          },
        });
        const data = await response.json();
        setDepartment(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDepartmentData();
  }, []);

  // Filter departments by search term
  const filteredDepartments = department.filter(departmentItem => 
    departmentItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Department</h2>

      {/* Create button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => openModal('Add Department')}
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
            placeholder="Search departments"
            className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
            <SearchOutlined />
          </button>
        </div>
      </div>

      <DepartmentTypeModal
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
            {filteredDepartments.map((departmentItem, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{departmentItem.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${departmentItem.department_status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {departmentItem.department_status === 1 ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openModal(`Edit ${departmentItem.name}`, departmentItem)}
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

export default Department;

