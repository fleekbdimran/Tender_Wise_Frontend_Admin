// import { useEffect, useState } from "react";
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from "@ant-design/icons";
// import ApiClient from "./../../../Api/ApiClient";

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
//               placeholder="Enter Your Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>
//           {/* <div className="flex justify-center mt-4">
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="Available"
//                 checked={currentStatus === "Available"}
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
//                 checked={currentStatus === "Unavailable"}
//                 onChange={handleRadioChange}
//                 className="mr-2"
//               />
//               Unavailable
//             </label>
//           </div> */}
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

// function Source() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("Add Designation Type");
//   const [currentStatus, setCurrentStatus] = useState("Available");
//   const [upazilaData, setUpazilaData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");

//   const openModal = (title, item) => {
//     setModalTitle(title);
//     setCurrentStatus(item ? item.status : "Available");
//     setIsModalOpen(true);
//   };

//   const handleStatusChange = (newStatus) => {
//     setCurrentStatus(newStatus);
//   };

//   const fetchUpazilaData = async () => {
//     try {
//       const response = await ApiClient.get("/admin/tender-config/source?key=");

//       // Transform the data to make the status human-readable
//       const transformedData = response.data.data.map((source) => ({
//         ...source,
//         status: source.status === 1 ? 'Available' : 'Unavailable', // Convert status to readable format
//       }));

//       setUpazilaData(transformedData); // Set the transformed data
//       // console.log(transformedData); // Log transformed data
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUpazilaData();
//   }, []);

//   // Filter data based on search term and status filter
//   const filteredData = upazilaData.filter((item) => {
//     const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus ? item.status === filterStatus : true;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-4">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Source</h2>

//       <div className="flex items-center justify-between mb-4">
//         {/* Create Button */}
//         <button
//           onClick={() => openModal("Add Designation Type")}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//         >
//           Create
//         </button>
//         {/* Search Bar */}
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search categories"
//             className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
//           />
//           <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
//             <SearchOutlined />
//           </button>
//         </div>

//         {/* Filter Dropdown */}
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-md"
//         >
//           <option value="">All</option>
//           <option value="Available">Available</option>
//           <option value="Unavailable">Unavailable</option>
//         </select>

//       </div>

//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
//         onStatusChange={handleStatusChange}
//       />

//       {/* Data Table */}
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
//                       item.status === "Available"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
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

// import { useEffect, useState } from "react";
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from "@ant-design/icons";
// import ApiClient from "./../../../Api/ApiClient";

// function DesignationTypeModal({ isOpen, onClose, title, currentItem, onSubmit }) {
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     sourceType: "E-GP",
//     details: "",
//   });

//   useEffect(() => {
//     if (currentItem) {
//       setFormData(currentItem);
//     } else {
//       setFormData({
//         id: "",
//         name: "",
//         sourceType: "E-GP",
//         details: "",
//       });
//     }
//   }, [currentItem]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form onSubmit={handleFormSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Source Type</label>
//             <select
//               name="sourceType"
//               value={formData.sourceType}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
//             >
//               <option value="E-GP">e-GP</option>
//               <option value="Newspaper">Newspaper</option>
//               <option value="Advertisement">Advertisement</option>
//               <option value="Website">Website</option>
//               <option value="Manual">Manual</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Details</label>
//             <input
//               type="text"
//               name="details"
//               value={formData.details}
//               onChange={handleChange}
//               placeholder="Enter Details"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
//             />
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

// function Source() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("Add Source");
//   const [currentItem, setCurrentItem] = useState(null);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");

//   const openModal = (title, item = null) => {
//     setModalTitle(title);
//     setCurrentItem(item);
//     setIsModalOpen(true);
//   };

//   const handleFormSubmit = (formData) => {
//     if (currentItem) {
//       // Edit existing item
//       setData((prev) =>
//         prev.map((item) => (item.id === currentItem.id ? { ...formData } : item))
//       );
//     } else {
//       // Add new item
//       setData((prev) => [...prev, { ...formData, id: prev.length + 1 }]);
//     }
//   };

//   // Filter data based on search term and status filter
//   const filteredData = data.filter((item) => {
//     const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-4">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Source</h2>

//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => openModal("Add Source")}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//         >
//           Create
//         </button>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search..."
//           className="px-4 py-2 border border-gray-300 rounded-md w-[400px]"
//         />
//       </div>

//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentItem={currentItem}
//         onSubmit={handleFormSubmit}
//       />

//       <div className="flex-grow overflow-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Source Type</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Details</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{item.id}</td>
//                 <td className="px-4 py-2 border-b">{item.name}</td>
//                 <td className="px-4 py-2 border-b">{item.sourceType}</td>
//                 <td className="px-4 py-2 border-b">{item.details}</td>
//                 <td className="px-4 py-2 border-b">
//                   <button
//                     onClick={() => openModal("Edit Source", item)}
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

// import { useEffect, useState } from "react";
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from "@ant-design/icons";

// function DesignationTypeModal({ isOpen, onClose, title, currentItem, onSubmit }) {
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     sourceType: "E-GP",
//     details: "",
//   });

//   useEffect(() => {
//     if (currentItem) {
//       setFormData(currentItem);
//     } else {
//       setFormData({
//         id: "",
//         name: "",
//         sourceType: "E-GP",
//         details: "",
//       });
//     }
//   }, [currentItem]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form onSubmit={handleFormSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Source Type</label>
//             <select
//               name="sourceType"
//               value={formData.sourceType}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
//             >
//               <option value="E-GP">e-GP</option>
//               <option value="Newspaper">Newspaper</option>
//               <option value="Advertisement">Advertisement</option>
//               <option value="Website">Website</option>
//               <option value="Manual">Manual</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Details</label>
//             <input
//               type="text"
//               name="details"
//               value={formData.details}
//               onChange={handleChange}
//               placeholder="Enter Details"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
//             />
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

// function Source() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("Add Source");
//   const [currentItem, setCurrentItem] = useState(null);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchSources = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append(
//       "Authorization",
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXFiYWwgMSIsImVtYWlsIjoiaXFiYWxAZ21haWwuY29tIiwicGhvbmUiOiI4ODAxOTk2MTA1MDIwIiwic3RhdHVzIjoxLCJ1cGRhdGVkX2J5Ijo2LCJpZCI6NiwidHlwZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNzMyMzM1NTE3LCJleHAiOjE3MzI0MjE5MTd9.IhvDJhsUmHIsUePMX8hNqmhOGUqb9ZvaaLis1awMY1Y"
//     );

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     try {
//       const response = await fetch(
//         "http://192.168.0.230:9009/api/v1/admin/tender-config/source",
//         requestOptions
//       );
//       const result = await response.json();
//       if (result.data) {
//         setData(result.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const createSource = async (formData) => {
//     const myHeaders = new Headers();
//     myHeaders.append(
//       "Authorization",
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXFiYWwgMSIsImVtYWlsIjoiaXFiYWxAZ21haWwuY29tIiwicGhvbmUiOiI4ODAxOTk2MTA1MDIwIiwic3RhdHVzIjoxLCJ1cGRhdGVkX2J5Ijo2LCJpZCI6NiwidHlwZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNzMyMzM1NTE3LCJleHAiOjE3MzI0MjE5MTd9.IhvDJhsUmHIsUePMX8hNqmhOGUqb9ZvaaLis1awMY1Y"
//     );
//     myHeaders.append("Content-Type", "application/json");

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: JSON.stringify(formData),
//     };

//     try {
//       const response = await fetch(
//         "http://192.168.0.230:9009/api/v1/admin/tender-config/source",
//         requestOptions
//       );
//       const result = await response.json();
//       if (result.data) {
//         setData((prev) => [...prev, result.data]);
//       }
//     } catch (error) {
//       console.error("Error creating source:", error);
//     }
//   };

//   const openModal = (title, item = null) => {
//     setModalTitle(title);
//     setCurrentItem(item);
//     setIsModalOpen(true);
//   };

//   const handleFormSubmit = (formData) => {
//     if (currentItem) {
//       // Simulate edit
//       setData((prev) =>
//         prev.map((item) => (item.id === currentItem.id ? { ...formData } : item))
//       );
//     } else {
//       // Add new source
//       createSource(formData);
//     }
//   };

//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     fetchSources();
//   }, []);

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-4">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Source</h2>

//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => openModal("Add Source")}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//         >
//           Create
//         </button>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search..."
//           className="px-4 py-2 border border-gray-300 rounded-md w-[400px]"
//         />
//       </div>

//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentItem={currentItem}
//         onSubmit={handleFormSubmit}
//       />

//       <div className="flex-grow overflow-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Type</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Details</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{item.id}</td>
//                 <td className="px-4 py-2 border-b">{item.name}</td>
//                 <td className="px-4 py-2 border-b">{item.Type}</td>
//                 <td className="px-4 py-2 border-b">{item.details}</td>
//                 <td className="px-4 py-2 border-b">
//                   <button
//                     onClick={() => openModal("Edit Source", item)}
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

// import { useEffect, useState } from "react";
// import { EditOutlined, CloseOutlined, SendOutlined } from "@ant-design/icons";

// function SourceModal({ isOpen, onClose, title, currentItem, onSubmit }) {
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     Type: "E-GP",
//     details: "",
//     status: "",
//     Action: "",
//   });

//   useEffect(() => {
//     if (currentItem) {
//       setFormData(currentItem);
//     } else {
//       setFormData({
//         id: "",
//         name: "",
//         Type: "E-GP",
//         details: "",
//         status: "",
//         Action: "",
//       });
//     }
//   }, [currentItem]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form onSubmit={handleFormSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700"> Type</label>
//             <select
//               name="sourceType"
//               value={formData.sourceType}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
//             >
//               <option value="E-GP">e-GP</option>
//               <option value="Newspaper">Newspaper</option>
//               <option value="Advertisement">Advertisement</option>
//               <option value="Website">Website</option>
//               <option value="Manual">Manual</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Details</label>
//             <input
//               type="text"
//               name="details"
//               value={formData.details}
//               onChange={handleChange}
//               placeholder="Enter Details"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
//             />
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

// function Source() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("Add Source");
//   const [currentItem, setCurrentItem] = useState(null);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchSources = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append(
//       "Authorization",
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXFiYWwgMSIsImVtYWlsIjoiaXFiYWxAZ21haWwuY29tIiwicGhvbmUiOiI4ODAxOTk2MTA1MDIwIiwic3RhdHVzIjoxLCJ1cGRhdGVkX2J5Ijo2LCJpZCI6NiwidHlwZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNzMyMzM1NTE3LCJleHAiOjE3MzI0MjE5MTd9.IhvDJhsUmHIsUePMX8hNqmhOGUqb9ZvaaLis1awMY1Y"
//     );

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     };

//     try {
//       const response = await fetch(
//         "http://192.168.0.230:9009/api/v1/admin/tender-config/source",
//         requestOptions
//       );
//       const result = await response.json();
//       if (result.data) {
//         setData(result.data);
//         console.log(response.data)
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const createSource = async (formData) => {
//     const myHeaders = new Headers();
//     myHeaders.append(
//       "Authorization",
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXFiYWwgMSIsImVtYWlsIjoiaXFiYWxAZ21haWwuY29tIiwicGhvbmUiOiI4ODAxOTk2MTA1MDIwIiwic3RhdHVzIjoxLCJ1cGRhdGVkX2J5Ijo2LCJpZCI6NiwidHlwZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNzMyMzM1NTE3LCJleHAiOjE3MzI0MjE5MTd9.IhvDJhsUmHIsUePMX8hNqmhOGUqb9ZvaaLis1awMY1Y"
//     );
//     myHeaders.append("Content-Type", "application/json");

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: JSON.stringify(formData),
//     };

//     try {
//       const response = await fetch(
//         "http://192.168.0.230:9009/api/v1/admin/tender-config/source",
//         requestOptions
//       );
//       const result = await response.json();
//       if (result.data) {
//         setData((prev) => [...prev, result.data]);
//       }
//     } catch (error) {
//       console.error("Error creating source:", error);
//     }
//   };

//   const openModal = (title, item = null) => {
//     setModalTitle(title);
//     setCurrentItem(item);
//     setIsModalOpen(true);
//   };

//   const handleFormSubmit = (formData) => {
//     if (currentItem) {
//       setData((prev) =>
//         prev.map((item) => (item.id === currentItem.id ? { ...formData } : item))
//       );
//     } else {
//       createSource(formData);
//     }
//   };

//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     fetchSources();
//   }, []);

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-4">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Source</h2>

//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => openModal("Add Source")}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//         >
//           Create
//         </button>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search..."
//           className="px-4 py-2 border border-gray-300 rounded-md w-[400px]"
//         />
//       </div>

//       <SourceModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentItem={currentItem}
//         onSubmit={handleFormSubmit}
//       />

//       <div className="flex-grow overflow-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Type</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Details</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{item.id}</td>
//                 <td className="px-4 py-2 border-b">{item.name}</td>
//                 <td className="px-4 py-2 border-b">{item.sourceType}</td>
//                 <td className="px-4 py-2 border-b">{item.details}</td>
//                 <td className="px-4 py-2 border-b">
//                   <button
//                     onClick={() => openModal("Edit Source", item)}
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

import { useEffect, useState } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import ApiClient from '../../../Api/ApiClient';

function SourceModal({ isOpen, onClose, title, currentItem, onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    sourceType: 'E-GP',
    details: '',
    status: 1, // Default status
  });

  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem);
    } else {
      setFormData({
        id: '',
        name: '',
        sourceType: 'E-GP',
        details: '',
        status: 1,
      });
    }
  }, [currentItem]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
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
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Source Type
            </label>
            <select
              name="sourceType"
              value={formData.sourceType}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
            >
              <option value="E-GP">e-GP</option>
              <option value="Newspaper">Newspaper</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Website">Website</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Details
            </label>
            <input
              type="text"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter Details"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
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

function Source() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Source');
  const [currentItem, setCurrentItem] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSources = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer YOUR_TOKEN_HERE');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    try {
      const response = await ApiClient.get(
        '/admin/tender-config/source',
        requestOptions
      );
      const result = await response.json();
      if (result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createSource = async formData => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer YOUR_TOKEN_HERE');
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(
        'http://192.168.0.230:9009/api/v1/admin/tender-config/source',
        requestOptions
      );
      const result = await response.json();
      if (result.data) {
        setData(prev => [...prev, result.data]);
      }
    } catch (error) {
      console.error('Error creating source:', error);
    }
  };

  const openModal = (title, item = null) => {
    setModalTitle(title);
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleFormSubmit = formData => {
    if (currentItem) {
      setData(prev =>
        prev.map(item => (item.id === currentItem.id ? { ...formData } : item))
      );
    } else {
      createSource(formData);
    }
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchSources();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Source</h2>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => openModal('Add Source')}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg"
        >
          Create
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-md w-[400px]"
        />
      </div>

      <SourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        currentItem={currentItem}
        onSubmit={handleFormSubmit}
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
                Type
              </th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
                Details
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
            {filteredData.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{item.id}</td>
                <td className="px-4 py-2 border-b">{item.name}</td>
                <td className="px-4 py-2 border-b">{item.sourceType}</td>
                <td className="px-4 py-2 border-b">{item.details}</td>
                <td className="px-4 py-2 border-b">
                  {item.status === 1 ? 'Active' : 'Inactive'}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openModal('Edit Source', item)}
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
