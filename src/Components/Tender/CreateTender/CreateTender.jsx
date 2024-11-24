
// import { EditOutlined, SearchOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { Pagination } from "antd";
// import { AiOutlineFile, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// // Sample Admin List
// const adminUserList = [
//   {
//     id: 91,
//     name: "Grand",
//     email: "Free",
//     expiredDate: "10-02-2025",
//     createdDate: "10-11-2024",
//     group: "Not Available",
//     status: "Publish",
//   },
//   {
//     id: 90,
//     name: "Rose",
//     email: "Popular",
//     expiredDate: "29-12-2024",
//     createdDate: "29-10-2024",
//     group: "Not Available",
//     status: "Pending",
//   },
// ];

// // Form for Creating or Editing Tenders
// const CreateTenderForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     invitationFor: "",
//     referenceNo: "",
//     tenderSection: "",
//     type: "",
//     category: "",
//     sector: "",
//     subSector: "",
//     department: "",
//     subDepartment: "",
//     division: "",
//     district: "",
//     upazila: "",
//     earnestMoney: "",
//     documentPrice: "",
//     publicOn: "",
//     openingDate: "",
//     endDate: "",
//     purchaseLastDate: "",
//     prebidMeetingDate: "",
//     submissionDate: "",
//     description: "",
//   });

//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     const requiredFields = [
//       "name",
//       "invitationFor",
//       "referenceNo",
//       "publicOn",
//       "openingDate",
//       "endDate",
//       "submissionDate",
//     ];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         alert(`Please fill in the ${field} field.`);
//         return;
//       }
//     }

//     console.log("Form submitted:", { ...formData, selectedFile });

//     onClose(); // Close the form
//   };

//   return (
//     <div className="block mx-auto p-8 w-full max-w-4xl">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Create Tender</h2>
//         <button
//           onClick={onClose}
//           className="text-gray-500 text-xl font-bold hover:text-red-500"
//         >
//           <AiOutlineClose />
//         </button>
//       </div>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {[
//               { label: "Name", id: "name", type: "text" },
//               { label: "Invitation for", id: "invitationFor", type: "text" },
//               { label: "Reference No", id: "referenceNo", type: "text" },
//               { label: "Tender Section", id: "tenderSection", type: "text" },
//               { label: "Type", id: "type", type: "text" },
//               { label: "Category", id: "category", type: "text" },
//               { label: "Sector", id: "sector", type: "text" },
//               { label: "Sub Sector", id: "subSector", type: "text" },
//               { label: "Department", id: "department", type: "text" },
//               { label: "Sub Department", id: "subDepartment", type: "text" },
//               { label: "Division", id: "division", type: "text" },
//               { label: "District", id: "district", type: "text" },
//               { label: "Upazila", id: "upazila", type: "text" },
//               { label: "Earnest Money", id: "earnestMoney", type: "text" },
//               { label: "Document Price", id: "documentPrice", type: "text" },
//               { label: "Public on", id: "publicOn", type: "date" },
//               { label: "Opening Date", id: "openingDate", type: "date" },
//               { label: "End Date", id: "endDate", type: "date" },
//               { label: "Purchase last date", id: "purchaseLastDate", type: "date" },
//               { label: "Prebid meeting date", id: "prebidMeetingDate", type: "date" },
//               { label: "Submission date", id: "submissionDate", type: "date" },
//               { label: "Description", id: "description", type: "text" },
//             ].map(({ label, id, type }) => (
//               <div key={id} className="w-full">
//                 <label className="block text-gray-700 font-medium mb-1" htmlFor={id}>
//                   {label}
//                 </label>
//                 <input
//                   type={type}
//                   id={id}
//                   name={id}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder={`Enter ${label}`}
//                   value={formData[id]}
//                   onChange={handleChange}
//                   required={["name", "publicOn", "submissionDate"].includes(id)}
//                 />
//               </div>
//             ))}

//             {/* File Upload */}
//             <div className="mt-6">
//               <label htmlFor="fileInput" className="block text-gray-700 font-medium mb-2">
//                 <AiOutlineFile className="inline text-gray-500 mr-1" /> File Upload
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
//             <div className="mt-6">
//               <label htmlFor="fileInput" className="block text-gray-700 font-medium mb-2">
//                 <AiOutlineFile className="inline text-gray-500 mr-1" /> Organization Logo
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
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredAdminList = adminUserList.filter((admin) =>
//     admin.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedAdminList = filteredAdminList.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };


//   return (
//     <div className="p-6 bg-gray-100">
//       {!showCreateForm && (
//         <div className="mb-4 flex justify-between items-center">
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="bg-teal-500 text-white px-7 py-3 rounded-lg flex items-center"
//           >
//             <AiOutlinePlus className="mr-2" />
//             Create
//           </button>
//           <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
//             <SearchOutlined className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search by Tender Name"
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full text-sm outline-none"
//             />
//           </div>
//         </div>
//       )}

//       {showCreateForm ? (
//         <CreateTenderForm onClose={() => setShowCreateForm(false)} />
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-3 border-b text-center">ID</th>
//                   <th className="p-3 border-b text-center">Name</th>
//                   <th className="p-3 border-b text-center">Type</th>
//                   <th className="p-3 border-b text-center">Status</th>
//                   <th className="p-3 border-b text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedAdminList.map((admin) => (
//                   <tr key={admin.id} className="text-center">
//                     <td className="p-3 border-b">{admin.id}</td>
//                     <td className="p-3 border-b">{admin.name}</td>
//                     <td className="p-3 border-b">{admin.email}</td>
//                     <td className="p-3 border-b">{admin.status}</td>
//                     <td className="p-3 border-b">
//                       <button
//                         className="text-blue-600"
//                         onClick={() => alert("Edit functionality here")}
//                       >
//                         <AiOutlineEye className="text-gray-600" size={24} />
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


// import { EditOutlined, SearchOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { Pagination } from "antd";
// import { AiOutlineFile, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// // Sample Admin List
// const adminUserList = [
//   {
//     id: 91,
//     name: "Grand",
//     email: "Free",
//     expiredDate: "10-02-2025",
//     createdDate: "10-11-2024",
//     group: "Not Available",
//     status: "Publish",
//   },
//   {
//     id: 90,
//     name: "Rose",
//     email: "Popular",
//     expiredDate: "29-12-2024",
//     createdDate: "29-10-2024",
//     group: "Not Available",
//     status: "Pending",
//   },
// ];

// // Form for Creating or Editing Tenders
// const CreateTenderForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     invitationFor: "",
//     referenceNo: "",
//     tenderSection: "",
//     type: "",
//     category: "",
//     sector: "",
//     subSector: "",
//     department: "",
//     subDepartment: "",
//     division: "",
//     district: "",
//     upazila: "",
//     earnestMoney: "",
//     documentPrice: "",
//     publicOn: "",
//     openingDate: "",
//     endDate: "",
//     purchaseLastDate: "",
//     prebidMeetingDate: "",
//     submissionDate: "",
//     description: "",
//   });

//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     const requiredFields = [
//       "name",
//       "invitationFor",
//       "referenceNo",
//       "publicOn",
//       "openingDate",
//       "endDate",
//       "submissionDate",
//     ];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         alert(`Please fill in the ${field} field.`);
//         return;
//       }
//     }

//     console.log("Form submitted:", { ...formData, selectedFile });

//     onClose(); // Close the form
//   };

//   return (
//     <div className="block mx-auto p-8 w-full max-w-4xl">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Create Tender</h2>
//         <button
//           onClick={onClose}
//           className="text-gray-500 text-xl font-bold hover:text-red-500"
//         >
//           <AiOutlineClose />
//         </button>
//       </div>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {[
//               { label: "Name", id: "name", type: "text" },
//               { label: "Invitation for", id: "invitationFor", type: "text" },
//               { label: "Reference No", id: "referenceNo", type: "text" },
//               { label: "Tender Section", id: "tenderSection", type: "text" },
//               { label: "Type", id: "type", type: "text" },
//               { label: "Category", id: "category", type: "text" },
//               { label: "Sector", id: "sector", type: "text" },
//               { label: "Sub Sector", id: "subSector", type: "text" },
//               { label: "Department", id: "department", type: "text" },
//               { label: "Sub Department", id: "subDepartment", type: "text" },
//               { label: "Division", id: "division", type: "text" },
//               { label: "District", id: "district", type: "text" },
//               { label: "Upazila", id: "upazila", type: "text" },
//               { label: "Earnest Money", id: "earnestMoney", type: "text" },
//               { label: "Document Price", id: "documentPrice", type: "text" },
//               { label: "Public on", id: "publicOn", type: "date" },
//               { label: "Opening Date", id: "openingDate", type: "date" },
//               { label: "End Date", id: "endDate", type: "date" },
//               { label: "Purchase last date", id: "purchaseLastDate", type: "date" },
//               { label: "Prebid meeting date", id: "prebidMeetingDate", type: "date" },
//               { label: "Submission date", id: "submissionDate", type: "date" },
//               { label: "Description", id: "description", type: "text" },
//             ].map(({ label, id, type }) => (
//               <div key={id} className="w-full">
//                 <label className="block text-gray-700 font-medium mb-1" htmlFor={id}>
//                   {label}
//                 </label>
//                 <input
//                   type={type}
//                   id={id}
//                   name={id}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder={`Enter ${label}`}
//                   value={formData[id]}
//                   onChange={handleChange}
//                   required={["name", "publicOn", "submissionDate"].includes(id)}
//                 />
//               </div>
//             ))}

//             {/* File Upload */}
//             <div className="mt-6">
//               <label htmlFor="fileInput" className="block text-gray-700 font-medium mb-2">
//                 <AiOutlineFile className="inline text-gray-500 mr-1" /> File Upload
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
//             <div className="mt-6">
//               <label htmlFor="fileInput" className="block text-gray-700 font-medium mb-2">
//                 <AiOutlineFile className="inline text-gray-500 mr-1" /> Organization Logo
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
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [viewTenderDetails, setViewTenderDetails] = useState(null);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredAdminList = adminUserList.filter((admin) =>
//     admin.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedAdminList = filteredAdminList.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleViewTender = (admin) => {
//     setViewTenderDetails(admin);
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       {!showCreateForm && !viewTenderDetails && (
//         <div className="mb-4 flex justify-between items-center">
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="bg-teal-500 text-white px-7 py-3 rounded-lg flex items-center"
//           >
//             <AiOutlinePlus className="mr-2" />
//             Create
//           </button>
//           <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
//             <SearchOutlined className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search by Tender Name"
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full text-sm outline-none"
//             />
//           </div>
//         </div>
//       )}

//       {showCreateForm ? (
//         <CreateTenderForm onClose={() => setShowCreateForm(false)} />
//       ) : viewTenderDetails ? (
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full">
//           <h2 className="text-2xl font-semibold mb-4">Single Tender View</h2>
//           <div className="text-gray-700">
//             <p><strong>Name: </strong>{viewTenderDetails.name}</p>
//             <p><strong>Email: </strong>{viewTenderDetails.email}</p>
//             <p><strong>Status: </strong>{viewTenderDetails.status}</p>
//             {/* Add more fields as needed */}
//           </div>
//           <button
//             onClick={() => setViewTenderDetails(null)}
//             className="mt-4 text-blue-600"
//           >
//             Close
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-3 border-b text-center">ID</th>
//                   <th className="p-3 border-b text-center">Name</th>
//                   <th className="p-3 border-b text-center">Type</th>
//                   <th className="p-3 border-b text-center">Status</th>
//                   <th className="p-3 border-b text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedAdminList.map((admin) => (
//                   <tr key={admin.id} className="text-center">
//                     <td className="p-3 border-b">{admin.id}</td>
//                     <td className="p-3 border-b">{admin.name}</td>
//                     <td className="p-3 border-b">{admin.email}</td>
//                     <td className="p-3 border-b">{admin.status}</td>
//                     <td className="p-3 border-b">
//                       <button
//                         className="text-blue-600"
//                         onClick={() => handleViewTender(admin)}
//                       >
//                         <AiOutlineEye className="text-gray-600" size={24} />
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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Sample Admin List
const adminUserList = [
  {
    id: 91,
    name: "Grand",
    email: "Free",
    expiredDate: "10-02-2025",
    createdDate: "10-11-2024",
    group: "Not Available",
    status: "Publish",
  },
  {
    id: 90,
    name: "Rose",
    email: "Popular",
    expiredDate: "29-12-2024",
    createdDate: "29-10-2024",
    group: "Not Available",
    status: "Pending",
  },
];

// Form for Creating or Editing Tenders
const CreateTenderForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    invitationFor: "",
    referenceNo: "",
    tenderSection: "",
    type: "",
    category: "",
    sector: "",
    subSector: "",
    department: "",
    subDepartment: "",
    division: "",
    district: "",
    upazila: "",
    earnestMoney: "",
    documentPrice: "",
    publicOn: "",
    openingDate: "",
    endDate: "",
    purchaseLastDate: "",
    prebidMeetingDate: "",
    submissionDate: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = [
      "name",
      "invitationFor",
      "referenceNo",
      "publicOn",
      "openingDate",
      "endDate",
      "submissionDate",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    console.log("Form submitted:", { ...formData, selectedFile });

    onClose(); // Close the form
  };

  return (
    <div className="block mx-auto p-8 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Create Tender</h2>
        <button
          onClick={onClose}
          className="text-gray-500 text-xl font-bold hover:text-red-500"
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Name", id: "name", type: "text" },
              { label: "Invitation for", id: "invitationFor", type: "text" },
              { label: "Reference No", id: "referenceNo", type: "text" },
              { label: "Tender Section", id: "tenderSection", type: "text" },
              { label: "Type", id: "type", type: "text" },
              { label: "Category", id: "category", type: "text" },
              { label: "Sector", id: "sector", type: "text" },
              { label: "Sub Sector", id: "subSector", type: "text" },
              { label: "Department", id: "department", type: "text" },
              { label: "Sub Department", id: "subDepartment", type: "text" },
              { label: "Division", id: "division", type: "text" },
              { label: "District", id: "district", type: "text" },
              { label: "Upazila", id: "upazila", type: "text" },
              { label: "Earnest Money", id: "earnestMoney", type: "text" },
              { label: "Document Price", id: "documentPrice", type: "text" },
              { label: "Public on", id: "publicOn", type: "date" },
              { label: "Opening Date", id: "openingDate", type: "date" },
              { label: "End Date", id: "endDate", type: "date" },
              { label: "Purchase last date", id: "purchaseLastDate", type: "date" },
              { label: "Prebid meeting date", id: "prebidMeetingDate", type: "date" },
              { label: "Submission date", id: "submissionDate", type: "date" },
              { label: "Description", id: "description", type: "text" },
            ].map(({ label, id, type }) => (
              <div key={id} className="w-full">
                <label className="block text-gray-700 font-medium mb-1" htmlFor={id}>
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${label}`}
                  value={formData[id]}
                  onChange={handleChange}
                  required={["name", "publicOn", "submissionDate"].includes(id)}
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
            <div className="mt-6">
              <label htmlFor="fileInput" className="block text-gray-700 font-medium mb-2">
                <AiOutlineFile className="inline text-gray-500 mr-1" /> Organization Logo
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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewTenderDetails, setViewTenderDetails] = useState(null);
  const [editTender, setEditTender] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdminList = adminUserList.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAdminList = filteredAdminList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewTender = (admin) => {
    setViewTenderDetails(admin);
  };

  const handleEditTender = () => {
    setEditTender(viewTenderDetails);
    setViewTenderDetails(null);  // Hide view form
  };

  const [selectedFile, setSelectedFile] = useState(null);
  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); // Update state with the selected file
  };
   // Simulate file upload
   const handleFileUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      alert(`File "${selectedFile.name}" has been uploaded!`);
      setSelectedFile(null); // Clear the selected file after upload
    } else {
      alert("Please select a file to upload.");
    }
  };

  const data = [
    { label: "Name", value: "Imran" },
    { label: "Earnest Money", value: "" },
    { label: "Document Price", value: "" },
    { label: "Published On", value: "" },
    { label: "Opening Date", value: "" },
    { label: "End Date", value: "" },
    { label: "Purchase Last Date", value: "" },
    { label: "Prebid Meeting Date", value: "" },
    { label: "Submission Date", value: "" },
    { label: "Tender Section", value: "" },
    { label: "Type", value: "" },
    { label: "Source Type", value: "" },
    { label: "Status", value: "" },
    { label: "Category Name", value: "" },
    { label: "Sector Name", value: "" },
    { label: "SubSector Name", value: "" },
    { label: "Department Name", value: "" },
    { label: "Sub Department Name", value: "" },
    { label: "Division Name", value: "" },
    { label: "District Name", value: "" },
    { label: "Upazila Name", value: "" },
    { label: "Source Name", value: "" },
    { label: "Created At", value: "" },
  ];
 
  return (
    <div className="p-6 bg-gray-100">
      {!showCreateForm && !viewTenderDetails && !editTender && (
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-teal-500 text-white px-7 py-3 rounded-lg flex items-center"
          >
            <AiOutlinePlus className="mr-2" />
            Create
          </button>
          <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
            <SearchOutlined className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Tender Name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full text-sm outline-none"
            />
          </div>
        </div>
      )}

      {showCreateForm ? (
        <CreateTenderForm onClose={() => setShowCreateForm(false)} />
      ) : viewTenderDetails ? (



      
<div className="p-6 bg-gray-100 min-h-screen">
<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  {/* Header Section */}
  <div className="flex justify-between items-center p-6 border-b border-gray-200">
    <h1 className="text-2xl font-bold text-teal-600">Single Tender View</h1>
    <div className="flex space-x-4">
      {/* Close Button */}
      <button
        onClick={() => setViewTenderDetails(null)}
        className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Close
      </button>
      {/* Edit Button */}
      {/* <button
        onClick={handleEditTender}
        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Edit Tender
      </button> */}
        {/* Update Button */}
        <button className="flex items-center px-6 py-2 bg-teal-500 text-white font-medium rounded-md shadow hover:bg-teal-600">
        <span className="mr-2">✏️</span> Update
      </button>
    </div>
  </div>

  {/* Main Content */}
  <div className="grid grid-cols-3 gap-6 p-6">
    {/* Details Section */}
    <div className="col-span-2">
      {/* <table className="table-auto w-full text-left text-sm border-separate border-spacing-y-2">
        <tbody>
          {[
            { label: "Name", value: "Imran" },
            { label: "Earnest Money", value: "" },
            { label: "Document Price", value: "" },
            { label: "Published On", value: "" },
            { label: "Opening Date", value: "" },
            { label: "End Date", value: "" },
            { label: "Purchase Last Date", value: "" },
            { label: "Prebid Meeting Date", value: "" },
            { label: "Submission Date", value: "" },
            { label: "Tender Section", value: "" },
            { label: "Type", value: "" },
            { label: "Source Type", value: "" },
            { label: "Status", value: "" },
            { label: "Category Name", value: "" },
            { label: "Sector Name", value: "" },
            { label: "SubSector Name", value: "" },
            { label: "Department Name", value: "" },
            { label: "Sub Department Name", value: "" },
            { label: "Division Name", value: "" },
            { label: "District Name", value: "" },
            { label: "Upazila Name", value: "" },
            { label: "Source Name", value: "" },
            { label: "Created At", value: "" },
          ].map((item, index) => (
            <tr key={index}>
              <td className="font-medium text-gray-700 py-2">{item.label}</td>
              <td className="py-2 text-gray-600">{item.value || "---"}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
        <div className="p-4">
      <table className="table-auto w-full text-left text-sm border-separate border-spacing-y-2">
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="font-medium text-gray-700 py-2">{item.label}</td>
              <td className="py-2 text-gray-600">{item.value || "---"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
    </div>

    {/* Image and Actions Section */}
    <div className="col-span-1 flex flex-col items-center">
      {/* Image Display */}
      <div className="relative w-full h-48 mb-4">
        <img
          src="https://via.placeholder.com/300"
          alt="Room"
          className="w-full h-full object-cover rounded-md"
        />
        <span className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
          142
        </span>
      </div>
    
    </div>
  </div>
</div>
</div>

      
      
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b text-center">ID</th>
                  <th className="p-3 border-b text-center">Name</th>
                  <th className="p-3 border-b text-center">Type</th>
                  <th className="p-3 border-b text-center">Status</th>
                  <th className="p-3 border-b text-center">Actions</th>
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
                        onClick={() => handleViewTender(admin)}
                      >
                        <AiOutlineEye className="text-gray-600" size={24} />
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
