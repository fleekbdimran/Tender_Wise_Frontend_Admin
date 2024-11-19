
// import { EditOutlined, SearchOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { Pagination } from "antd";
// import { AiFillStar } from "react-icons/ai";

// const adminUserList = [
//   { id: 91, name: "Grand Mostafa l Ababil", email: "info@hotelgrandmostafa.com", expiredDate: "10-02-2025", createdDate: "10-11-2024", group: "Not Available", status: "ACTIVE" },
//   { id: 90, name: "Rose View Hotel", email: "info@roseviewhotel.com", expiredDate: "29-12-2024", createdDate: "29-10-2024", group: "Not Available", status: "ACTIVE" },
//   { id: 89, name: "Sairu Hill Resort Ltd.", email: "sairuhillresort@gmail.com", expiredDate: "27-12-2024", createdDate: "27-10-2024", group: "Not Available", status: "ACTIVE" },
//   { id: 88, name: "Best Western Heritage", email: "fom@bwheritagehotel.com", expiredDate: "24-01-2025", createdDate: "22-10-2024", group: "null", status: "ACTIVE" },
//   { id: 87, name: "Hotel Alpha", email: "alpha@hotel.com", expiredDate: "15-01-2025", createdDate: "15-11-2024", group: "Not Available", status: "ACTIVE" },
//   { id: 86, name: "Ocean Resort", email: "ocean@resort.com", expiredDate: "12-12-2024", createdDate: "12-11-2024", group: "Not Available", status: "INACTIVE" },
// ];

// const CreateUsers = ({ onClose }) => {
//   const [usersName, setName] = useState('');
//   const [usersEmail, setUsersEmail] = useState('');
//   const [usersPhone, setUsersPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [retypePassword, setRetypePassword] = useState('');
//   const [adminType, setAdminType] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!usersName || !usersEmail || !usersPhone || !password || !retypePassword || !adminType) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     if (password !== retypePassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     console.log("Form submitted", {
//       usersName,
//       usersEmail,
//       usersPhone,
//       password,
//       adminType,
//     });

//     onClose(); // Close the form
//   };

//   return (
//     <div className="block mx-auto p-8 w-full max-w-4xl">
//       <div className="flex justify-between items-center mb-6">
       
//         <button
//           onClick={onClose}
//           className="text-gray-500 text-xl font-bold hover:text-red-500"
//         >
//           X
//         </button>
//       </div>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full">
    
// {/* <form onSubmit={handleSubmit}>
//   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//     {[
//       { label: "Name", id: "Name", type: "text", value: name, setter: setName },
//       { label: "Invitation for", id: "Invitation for", type: "text", value: name, setter: setName },
//       { label: "Reference No", id: "Reference No", type: "text", value: name, setter: setName },
//       { label: "Tender Section", id: "Tender Section", type: "text", value: name, setter: setName },
//       { label: "Type", id: "Type", type: "text", value: name, setter: setName },
//       { label: "Category", id: "Category", type: "text", value: name, setter: setName },
//       { label: "Sector", id: "Sector", type: "text", value: name, setter: setName },
//       { label: "Sub Sector", id: "Sub Sector", type: "text", value: name, setter: setName },
//       { label: "Department", id: "Department", type: "text", value: name, setter: setName },
//       { label: "sub Department", id: "Sub Department", type: "text", value: name, setter: setName },
//       { label: "Division", id: "Division", type: "text", value: name, setter: setName },
//       { label: "District", id: "District", type: "text", value: name, setter: setName },
//       { label: "Upazila", id: "Upazila", type: "text", value: name, setter: setName },
//       { label: "Earnest Money", id: "Earnest Money", type: "text", value: name, setter: setName },
//       { label: "Document Price", id: "Document Price", type: "text", value: name, setter: setName },
//       { label: "Public on", id: "Public on", type: "text", value: name, setter: setName },
//       { label: "Opening Date", id: "Opening Date", type: "text", value: name, setter: setName },
//       { label: "End Date", id: "End Date", type: "text", value: name, setter: setName },
//       { label: "Purchase last date", id: "Purchase last date", type: "text", value: name, setter: setName },
//       { label: "Prebid meeting date", id: "Prebid meeting date", type: "text", value: name, setter: setName },
//       { label: "Submission date", id: "Submission date", type: "text", value: name, setter: setName },
//       { label: "Description", id: "Description", type: "text", value: name, setter: setName },
//       <div className="mt-6">
//       <label
//         htmlFor="fileInput"
//         className="block text-gray-700 font-medium mb-2"
//       >
//         <AiFillStar className="inline text-red-500 mr-1" /> Upload a File
//       </label>
//       <input
//         type="file"
//         id="fileInput"
//         className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         onChange={handleFileChange}
//       />
//     </div>
//     {selectedFile && (
//       <p className="mt-2 text-sm text-gray-600">
//         Selected File:{" "}
//         <span className="font-medium text-gray-800">{selectedFile.name}</span>
//       </p>
//     )}
      
      
//     ].map(({ label, id, type, value, setter }) => (
//       <div key={id} className="w-full">
//         <label className="block text-gray-700 font-medium mb-1" htmlFor={id}>
//           <AiFillStar className="inline text-red-500 mr-1" /> {label}
//         </label>
//         <input
//           type={type}
//           id={id}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder={`Enter ${label}`}
//           value={value}
//           onChange={(e) => setter(e.target.value)}
//           required
//         />
//       </div>
//     ))}
//   </div>
 
//   <div className="mt-8 flex justify-center">
//     <button
//       type="submit"
//       className="w-full sm:w-[200px] px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       Submit
//     </button>
//   </div>
// </form> */}

// <form onSubmit={handleSubmit}>
//   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//     {[ 
//       { label: "Name", id: "Name", type: "text", value: name, setter: setName },
//       { label: "Invitation for", id: "Invitation for", type: "text", value: name, setter: setName },
//       { label: "Reference No", id: "Reference No", type: "text", value: name, setter: setName },
//       { label: "Tender Section", id: "Tender Section", type: "text", value: name, setter: setName },
//       { label: "Type", id: "Type", type: "text", value: name, setter: setName },
//       { label: "Category", id: "Category", type: "text", value: name, setter: setName },
//       { label: "Sector", id: "Sector", type: "text", value: name, setter: setName },
//       { label: "Sub Sector", id: "Sub Sector", type: "text", value: name, setter: setName },
//       { label: "Department", id: "Department", type: "text", value: name, setter: setName },
//       { label: "sub Department", id: "Sub Department", type: "text", value: name, setter: setName },
//       { label: "Division", id: "Division", type: "text", value: name, setter: setName },
//       { label: "District", id: "District", type: "text", value: name, setter: setName },
//       { label: "Upazila", id: "Upazila", type: "text", value: name, setter: setName },
//       { label: "Earnest Money", id: "Earnest Money", type: "text", value: name, setter: setName },
//       { label: "Document Price", id: "Document Price", type: "text", value: name, setter: setName },
//       { label: "Public on", id: "Public on", type: "text", value: name, setter: setName },
//       { label: "Opening Date", id: "Opening Date", type: "text", value: name, setter: setName },
//       { label: "End Date", id: "End Date", type: "text", value: name, setter: setName },
//       { label: "Purchase last date", id: "Purchase last date", type: "text", value: name, setter: setName },
//       { label: "Prebid meeting date", id: "Prebid meeting date", type: "text", value: name, setter: setName },
//       { label: "Submission date", id: "Submission date", type: "text", value: name, setter: setName },
//       { label: "Description", id: "Description", type: "text", value: name, setter: setName }
//     ].map(({ label, id, type, value, setter }) => (
//       <div key={id} className="w-full">
//         <label className="block text-gray-700 font-medium mb-1" htmlFor={id}>
//           <AiFillStar className="inline text-red-500 mr-1" /> {label}
//         </label>
//         <input
//           type={type}
//           id={id}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder={`Enter ${label}`}
//           value={value}
//           onChange={(e) => setter(e.target.value)}
//           required
//         />
//       </div>
//     ))}

//     {/* File Upload */}
//     <div className="mt-6">
//       <label htmlFor="fileInput" className="block text-gray-700 font-medium mb-2">
//         <AiFillStar className="inline text-red-500 mr-1" /> Upload a File
//       </label>
//       <input
//         type="file"
//         id="fileInput"
//         className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         onChange={handleFileChange}
//       />
//       {selectedFile && (
//         <p className="mt-2 text-sm text-gray-600">
//           Selected File:{" "}
//           <span className="font-medium text-gray-800">{selectedFile.name}</span>
//         </p>
//       )}
//     </div>
//   </div>

//   <div className="mt-8 flex justify-center">
//     <button
//       type="submit"
//       className="w-full sm:w-[200px] px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       Submit
//     </button>
//   </div>
// </form>


//       </div>
//     </div>
//   );
// };

// const CreateTender = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [showCreateUser, setShowCreateUser] = useState(false);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredAdminList = adminUserList.filter((admin) =>
//     admin.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedAdminList = filteredAdminList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-4">Create Tender</h2>

//       {!showCreateUser && (
//         <div className="mb-4 flex justify-between items-center">
//           <button
//             onClick={() => setShowCreateUser(true)}
//             className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//           >
//             Create
//           </button>
//           <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
//             <SearchOutlined className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search by Admin Name"
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full text-sm outline-none"
//             />
//           </div>
//         </div>
//       )}

//       {showCreateUser ? (
//         <CreateUsers onClose={() => setShowCreateUser(false)} />
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                   <th className="py-3 px-6 text-left font-bold">Id</th>
//                   <th className="py-3 px-6 text-left font-bold">Name</th>
//                   <th className="py-3 px-6 text-left font-bold">Email</th>
//                   <th className="py-3 px-6 text-left font-bold">Phone</th>
//                   <th className="py-3 px-6 text-left font-bold">Group</th>
//                   <th className="py-3 px-6 text-left font-bold">Status</th>
//                   <th className="py-3 px-6 text-left font-bold">Update</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 text-sm font-light">
//                 {paginatedAdminList.map((admin) => (
//                   <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-100">
//                     <td className="py-3 px-6 text-left whitespace-nowrap font-bold">{admin.id}</td>
//                     <td className="py-3 px-6 text-left">{admin.name}</td>
//                     <td className="py-3 px-6 text-left">{admin.email}</td>
//                     <td className="py-3 px-6 text-left">N/A</td>
//                     <td className="py-3 px-6 text-left">{admin.group}</td>
//                     <td className="py-3 px-6 text-left">{admin.status}</td>
//                     <td className="py-3 px-6 text-left">
//                       <button className="text-blue-500 hover:underline">
//                         <EditOutlined />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-4 flex justify-center">
//             <Pagination
//               current={currentPage}
//               pageSize={pageSize}
//               total={filteredAdminList.length}
//               onChange={handlePageChange}
//               showSizeChanger={false}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CreateTender;



// import { EditOutlined, SearchOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { Pagination } from "antd";

// const adminUserList = [
//   { id: 91, name: "Grand", email: "Free", expiredDate: "10-02-2025", createdDate: "10-11-2024", group: "Not Available", status: "Publish" },
//   { id: 90, name: "Rose ", email: "Popular", expiredDate: "29-12-2024", createdDate: "29-10-2024", group: "Not Available", status: "Pending" },
//   // ... Add more users here
// ];

// const CreateUsers = ({ onClose }) => {
//   const [usersName, setName] = useState('');
//   const [usersEmail, setUsersEmail] = useState('');
//   const [usersPhone, setUsersPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [retypePassword, setRetypePassword] = useState('');
//   const [adminType, setAdminType] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!usersName || !usersEmail || !usersPhone || !password || !retypePassword || !adminType) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     if (password !== retypePassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     console.log("Form submitted", {
//       usersName,
//       usersEmail,
//       usersPhone,
//       password,
//       adminType,
//       selectedFile,
//     });

//     onClose(); // Close the form
//   };

//   return (
//     <div className="block mx-auto p-8 w-full max-w-4xl">
//         {/* <h2>Create Tender</h2> */}
//       <div className="flex justify-between items-center mb-6">
//         <button onClick={onClose} className="text-gray-500 text-xl font-bold hover:text-red-500">X</button>
//       </div>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full">
       
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {[ 
//              { label: "Name", id: "Name", type: "text", value: name, setter: setName },
//              { label: "Invitation for", id: "Invitation for", type: "text", value: name, setter: setName },
//              { label: "Reference No", id: "Reference No", type: "text", value: name, setter: setName },
//              { label: "Tender Section", id: "Tender Section", type: "text", value: name, setter: setName },
//              { label: "Type", id: "Type", type: "text", value: name, setter: setName },
//              { label: "Category", id: "Category", type: "text", value: name, setter: setName },
//              { label: "Sector", id: "Sector", type: "text", value: name, setter: setName },
//              { label: "Sub Sector", id: "Sub Sector", type: "text", value: name, setter: setName },
//              { label: "Department", id: "Department", type: "text", value: name, setter: setName },
//              { label: "sub Department", id: "Sub Department", type: "text", value: name, setter: setName },
//              { label: "Division", id: "Division", type: "text", value: name, setter: setName },
//              { label: "District", id: "District", type: "text", value: name, setter: setName },
//              { label: "Upazila", id: "Upazila", type: "text", value: name, setter: setName },
//              { label: "Earnest Money", id: "Earnest Money", type: "text", value: name, setter: setName },
//              { label: "Document Price", id: "Document Price", type: "text", value: name, setter: setName },
//              { label: "Public on", id: "Public on", type: "text", value: name, setter: setName },
//              { label: "Opening Date", id: "Opening Date", type: "text", value: name, setter: setName },
//              { label: "End Date", id: "End Date", type: "text", value: name, setter: setName },
//              { label: "Purchase last date", id: "Purchase last date", type: "text", value: name, setter: setName },
//              { label: "Prebid meeting date", id: "Prebid meeting date", type: "text", value: name, setter: setName },
//              { label: "Submission date", id: "Submission date", type: "text", value: name, setter: setName },
//              { label: "Description", id: "Description", type: "text", value: name, setter: setName }
//             ].map(({ label, id, type, value, setter }) => (
//               <div key={id} className="w-full">
//                 <label className="block text-gray-700 font-medium mb-1" htmlFor={id}>
//                   {label}
//                 </label>
//                 <input
//                   type={type}
//                   id={id}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder={`Enter ${label}`}
//                   value={value}
//                   onChange={(e) => setter(e.target.value)}
//                   required
//                 />
//               </div>
//             ))}

//             {/* File Upload */}
//             <div className="mt-6">
//               <label htmlFor="fileInput" className="block text-gray-700 font-medium mb-2">
//                  File Upload 
//               </label>
//               <input
//                 type="file"
//                 id="fileInput"
//                 className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onChange={handleFileChange}
//               />
//               {selectedFile && (
//                 <p className="mt-2 text-sm text-gray-600">
//                   Selected File:{" "}
//                   <span className="font-medium text-gray-800">{selectedFile.name}</span>
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 flex justify-center">
//             <button
//               type="submit"
//               className="w-full sm:w-[200px] px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const CreateTender = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [showCreateUser, setShowCreateUser] = useState(false);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredAdminList = adminUserList.filter((admin) =>
//     admin.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedAdminList = filteredAdminList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-4">Create Tender</h2>

//       {!showCreateUser && (
//         <div className="mb-4 flex justify-between items-center">
//           <button
//             onClick={() => setShowCreateUser(true)}
//             className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//           >
//             Create
//           </button>
//           <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
//             <SearchOutlined className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search by Admin Name"
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full text-sm outline-none"
//             />
//           </div>
//         </div>
//       )}

//       {showCreateUser ? (
//         <CreateUsers onClose={() => setShowCreateUser(false)} />
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-3 border-b">ID</th>
//                   <th className="p-3 border-b">Name</th>
//                   <th className="p-3 border-b">Type</th>
//                   <th className="p-3 border-b">Publish Status</th>
//                   <th className="p-3 border-b">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedAdminList.map((admin) => (
//                   <tr key={admin.id}>
//                     <td className="p-3 border-b">{admin.id}</td>
//                     <td className="p-3 border-b">{admin.name}</td>
//                     <td className="p-3 border-b">{admin.email}</td>
//                     <td className="p-3 border-b">{admin.status}</td>
//                     <td className="p-3 border-b">
//                       <button
//                         className="text-blue-600"
//                         onClick={() => alert("Edit functionality here")}
//                       >
//                         <EditOutlined />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-6 flex justify-center">
//             <Pagination
//               current={currentPage}
//               total={filteredAdminList.length}
//               pageSize={pageSize}
//               onChange={handlePageChange}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CreateTender;


import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Pagination } from "antd";
import { AiOutlineFile, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const adminUserList = [
  { id: 91, name: "Grand", email: "Free", expiredDate: "10-02-2025", createdDate: "10-11-2024", group: "Not Available", status: "Publish" },
  { id: 90, name: "Rose", email: "Popular", expiredDate: "29-12-2024", createdDate: "29-10-2024", group: "Not Available", status: "Pending" },
  // ... Add more users here
];

const CreateUsers = ({ onClose }) => {
  const [usersName, setName] = useState('');
  const [usersEmail, setUsersEmail] = useState('');
  const [usersPhone, setUsersPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [adminType, setAdminType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usersName || !usersEmail || !usersPhone || !password || !retypePassword || !adminType) {
      alert("Please fill in all required fields.");
      return;
    }
    if (password !== retypePassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Form submitted", {
      usersName,
      usersEmail,
      usersPhone,
      password,
      adminType,
      selectedFile,
    });

    onClose(); // Close the form
  };

  return (
    <div className="block mx-auto p-8 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onClose} className="text-gray-500 text-xl font-bold hover:text-red-500">
          <AiOutlineClose />
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Name", id: "Name", type: "text", value: name, setter: setName },
              { label: "Invitation for", id: "Invitation for", type: "text", value: name, setter: setName },
              { label: "Reference No", id: "Reference No", type: "text", value: name, setter: setName },
              { label: "Tender Section", id: "Tender Section", type: "text", value: name, setter: setName },
              { label: "Type", id: "Type", type: "text", value: name, setter: setName },
              { label: "Category", id: "Category", type: "text", value: name, setter: setName },
              { label: "Sector", id: "Sector", type: "text", value: name, setter: setName },
              { label: "Sub Sector", id: "Sub Sector", type: "text", value: name, setter: setName },
              { label: "Department", id: "Department", type: "text", value: name, setter: setName },
              { label: "sub Department", id: "Sub Department", type: "text", value: name, setter: setName },
              { label: "Division", id: "Division", type: "text", value: name, setter: setName },
              { label: "District", id: "District", type: "text", value: name, setter: setName },
              { label: "Upazila", id: "Upazila", type: "text", value: name, setter: setName },
              { label: "Earnest Money", id: "Earnest Money", type: "text", value: name, setter: setName },
              { label: "Document Price", id: "Document Price", type: "text", value: name, setter: setName },
              { label: "Public on", id: "Public on", type: "text", value: name, setter: setName },
              { label: "Opening Date", id: "Opening Date", type: "text", value: name, setter: setName },
              { label: "End Date", id: "End Date", type: "text", value: name, setter: setName },
              { label: "Purchase last date", id: "Purchase last date", type: "text", value: name, setter: setName },
              { label: "Prebid meeting date", id: "Prebid meeting date", type: "text", value: name, setter: setName },
              { label: "Submission date", id: "Submission date", type: "text", value: name, setter: setName },
              { label: "Description", id: "Description", type: "text", value: name, setter: setName }
            ].map(({ label, id, type, value, setter }) => (
              <div key={id} className="w-full">
                <label className="block text-gray-700 font-medium mb-1" htmlFor={id}>
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${label}`}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  required
                />
              </div>
            ))}

            {/* File Upload */}
            <div className="mt-6">
              <label htmlFor="fileInput" className="block text-gray-700 font-medium mb-2">
                <AiOutlineFile className="inline text-gray-500 mr-1" /> File Upload
              </label>
              <input
                type="file"
                id="fileInput"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected File:{" "}
                  <span className="font-medium text-gray-800">{selectedFile.name}</span>
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-[200px] px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateTender = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdminList = adminUserList.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAdminList = filteredAdminList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 ">Create Tender</h2>

      {!showCreateUser && (
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setShowCreateUser(true)}
            className="bg-teal-500 text-white px-7 py-3 rounded-lg flex items-center"
          >
            <AiOutlinePlus className="mr-2" />
            Create
          </button>
          <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
            <SearchOutlined className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Admin Name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full text-sm outline-none"
            />
          </div>
        </div>
      )}

      {showCreateUser ? (
        <CreateUsers onClose={() => setShowCreateUser(false)} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b text-center">ID</th>
                  <th className="p-3 border-b text-center">Name</th>
                  <th className="p-3 border-b text-center">Type</th>
                  <th className="p-3 border-b text-center">Publish Status</th>
                  <th className="p-3 border-b text-center">Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {paginatedAdminList.map((admin) => (
                  <tr key={admin.id} className="text-center">
                    <td className="p-3 border-b">{admin.id}</td>
                    <td className="p-3 border-b">{admin.name}</td>
                    <td className="p-3 border-b">{admin.email}</td>
                    <td className="p-3 border-b">{admin.status}</td>
                    <td className="p-3 border-b">
                      <button
                        className="text-blue-600"
                        onClick={() => alert("Edit functionality here")}
                      >
                        <EditOutlined />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination
              current={currentPage}
              total={filteredAdminList.length}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTender;


