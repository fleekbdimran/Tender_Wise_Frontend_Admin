




// import { useState, useEffect } from "react";
// import ApiClient from "../../../Api/ApiClient"; // Custom axios instance

// // PostTender component
// const PostTender = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     status: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle tender submission
//     console.log(formData);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
//         {/* Left Section */}
//         <div className="p-6 flex flex-col items-center justify-center w-full md:w-1/2">
//           <img src="/src/image/image 18.png" alt="Logo" className="h-52 md:h-48 object-contain" />
//           <div className="text-center mt-6">
//             <h1 className="text-2xl font-bold text-blue-600 mb-4 text-[25px] md:text-[30px]">
//               Post your tender in
//               <div className="text-yellow-500 text-xl mt-2 text-[25px] md:text-[30px]">
//                 TenderWise
//               </div>
//             </h1>
//             <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
//               See details →
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="p-6 w-full md:w-1/2 border border-gray-200 rounded-md shadow-lg">
//           <p className="text-gray-600 mb-7 text-center">
//             Post RFQs, private tenders, and auction notices here to drive competitive pricing and quality.
//           </p>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {[
//               { label: "Name", id: "name", type: "text", placeholder: "Enter your name", required: true },
//               { label: "Phone Number", id: "phone", type: "tel", placeholder: "Enter your phone number", required: true },
//               { label: "Email", id: "email", type: "email", placeholder: "Enter your email", required: true },
//               { label: "Designation", id: "designation", type: "text", placeholder: "Enter your designation" },
//               { label: "Institute", id: "institute", type: "text", placeholder: "Enter your institute" },
//               { label: "Tender's Name", id: "tenderName", type: "text", placeholder: "Enter tender's name", required: true },
//               { label: "Tender's File (PDF only)", id: "tenderFile", type: "file", required: true }
//             ].map((field, idx) => (
//               <div key={idx} className="flex flex-col gap-2">
//                 <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
//                   {field.label}
//                 </label>
//                 <input
//                   id={field.id}
//                   name={field.id}
//                   type={field.type}
//                   onChange={handleChange}
//                   placeholder={field.placeholder || ""}
//                   required={field.required || false}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             ))}

//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="px-6 py-3 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 transition"
//               >
//                 Post Tender
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // AllPublishTender component
// const AllPublishTender = () => {
//   const [data, setData] = useState([]); // State to store fetched data
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [error, setError] = useState(null); // State for error handling
//   const [editingIndex, setEditingIndex] = useState(null); // State to track which row is being edited
//   const [viewingIndex, setViewingIndex] = useState(null); // State to track which row is being viewed
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     designation: "",
//     institute: "",
//     tenderName: "",
//     tenderFile: null,
//   });

//   // Function to fetch data from the API
//   const fetchTenders = async () => {
//     try {
//       const response = await ApiClient.get("/admin/tender/publish-tender?key");
//       if (response.data && Array.isArray(response.data.data)) {
//         setData(response.data.data);
//       } else {
//         setError("Unexpected response format.");
//       }
//     } catch (err) {
//       setError("Failed to fetch tenders. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTenders();
//   }, []);

//   const handleStatusChange = (index, status) => {
//     setEditingIndex(null); // Close the dropdown
//     const updatedData = [...data];
//     updatedData[index].status = status; // Update the status in local state
//     setData(updatedData);
//   };

//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "tenderFile" && files) {
//       const file = files[0];
//       if (file && file.type !== "application/pdf") {
//         alert("Please upload a valid PDF file.");
//         return;
//       }
//       setFormData({
//         ...formData,
//         tenderFile: file,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Tender Requests</h2>
//       {loading && <p className="text-gray-600">Loading tenders...</p>}
//       {error && <p className="text-red-600">{error}</p>}
//       {!loading && !error && data.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-200 text-left">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-200 px-4 py-2">ID</th>
//                 <th className="border border-gray-200 px-4 py-2">Name</th>
//                 <th className="border border-gray-200 px-4 py-2">Organization Name</th>
//                 <th className="border border-gray-200 px-4 py-2">Phone</th>
//                 <th className="border border-gray-200 px-4 py-2">Tender Name</th>
//                 <th className="border border-gray-200 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={item.id || Math.random()} className="hover:bg-gray-50">
//                   <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
//                   <td className="border border-gray-200 px-4 py-2">{item.name || "N/A"}</td>
//                   <td className="border border-gray-200 px-4 py-2">{item.organization_name || "N/A"}</td>
//                   <td className="border border-gray-200 px-4 py-2">{item.phone || "N/A"}</td>
//                   <td className="border border-gray-200 px-4 py-2">{item.tender_name || "N/A"}</td>
//                   <td className="border border-gray-200 px-4 py-2 text-center">
//                     {editingIndex === index ? (
//                       <select
//                         className="border border-gray-300 rounded px-2 py-1"
//                         value={item.status || ""}
//                         onChange={(e) => handleStatusChange(index, e.target.value)}
//                       >
//                         <option value="">Select a status</option>
//                         <option value="in_Review">in_Review</option>
//                         <option value="Pending">Pending</option>
//                         <option value="Published">Published</option>
//                         <option value="Cancel">Cancel</option>
//                       </select>
//                     ) : (
//                       <span
//                         className="text-blue-600 hover:underline cursor-pointer"
//                         onClick={() => setEditingIndex(index)}
//                       >
//                         Edit
//                       </span>
//                     )}
//                     <span
//                       className="text-blue-600 hover:underline cursor-pointer ml-4"
//                       onClick={() => {
//                         setViewingIndex(index);
//                         setFormData({
//                           name: item.name || "",
//                           phone: item.phone || "",
//                           email: item.email || "",
//                           designation: item.designation || "",
//                           institute: item.organization_name || "",
//                           tenderName: item.tender_name || "",
//                           tenderFile: null, // Clear file input for viewing
//                         });
//                       }}
//                     >
//                       View
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         !loading && !error && <p className="text-gray-600">No tenders found.</p>
//       )}

//       {/* Form for "View" action */}
//       {viewingIndex !== null && (
//         <div className="mt-6 p-6 bg-white shadow-md rounded-md">
//           <h2 className="text-xl font-bold mb-4">View Tender Details</h2>
//           <form className="space-y-6">
//             {[
//               { label: "Name", id: "name", type: "text", value: formData.name },
//               { label: "Phone Number", id: "phone", type: "tel", value: formData.phone },
//               { label: "Email", id: "email", type: "email", value: formData.email },
//               { label: "Designation", id: "designation", type: "text", value: formData.designation },
//               { label: "Institute", id: "institute", type: "text", value: formData.institute },
//               { label: "Tender's Name", id: "tenderName", type: "text", value: formData.tenderName },
//             ].map((field, idx) => (
//               <div key={idx} className="flex flex-col gap-2">
//                 <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
//                   {field.label}
//                 </label>
//                 <input
//                   id={field.id}
//                   name={field.id}
//                   type={field.type}
//                   value={field.value}
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
//                 />
//               </div>
//             ))}
//             <div>
//               <label htmlFor="tenderFile" className="block text-sm font-medium text-gray-700">
//                 Tender's File (PDF)
//               </label>
//               <input
//                 id="tenderFile"
//                 name="tenderFile"
//                 type="file"
//                 onChange={handleFormChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 disabled
//               />
//             </div>
//             <button
//               type="button"
//               onClick={() => setViewingIndex(null)}
//               className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPublishTender;



// import { useEffect, useState } from "react";
// import ApiClient from "../../../Api/ApiClient"; // Import the custom axios instance

// const AllPublishTender = () => {
//   const [data, setData] = useState([]); // State to store fetched data
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [error, setError] = useState(null); // State for error handling
//   const [editingIndex, setEditingIndex] = useState(null); // State to track which row is being edited
//   const [selectedStatus, setSelectedStatus] = useState(""); // State to track selected status

//   // Function to fetch data from the API
//   const fetchTenders = async () => {
//     try {
//       const response = await ApiClient.get("/admin/tender/publish-tender?key");
//       if (response.data && Array.isArray(response.data.data)) {
//         setData(response.data.data);
//       } else {
//         setError("Unexpected response format.");
//       }
//     } catch (err) {
//       setError("Failed to fetch tenders. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchTenders();
//   }, []);

//   // Function to handle status change
//   const handleStatusChange = (index, status) => {
//     setEditingIndex(null); // Close the dropdown
//     const updatedData = [...data];
//     updatedData[index].status = status; // Update the status in local state
//     setData(updatedData);

//     // Optionally send the updated status to the API
//     ApiClient.post(`/admin/tender/${data[index].id}/update-status`, {
//       status,
//     })
//       .then(() => {
//         console.log("Status updated successfully");
//       })
//       .catch((err) => {
//         console.error("Error updating status:", err);
//       });
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Tender Request</h2>
//       {loading && <p className="text-gray-600">Loading tenders...</p>}
//       {error && <p className="text-red-600">{error}</p>}
//       {!loading && !error && data.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-200 text-left">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-200 px-4 py-2">ID</th>
//                 <th className="border border-gray-200 px-4 py-2">Name</th>
//                 <th className="border border-gray-200 px-4 py-2">Organization Name</th>
//                 <th className="border border-gray-200 px-4 py-2">Phone</th>
//                 <th className="border border-gray-200 px-4 py-2">Tender Name</th>
//                 <th className="border border-gray-200 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={item.id || Math.random()} className="hover:bg-gray-50">
//                   <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
//                   <td className="border border-gray-200 px-4 py-2">{item.name || "N/A"}</td>
//                   <td className="border border-gray-200 px-4 py-2">
//                     {item.organization_name || "N/A"}
//                   </td>
//                   <td className="border border-gray-200 px-4 py-2">{item.phone || "N/A"}</td>
//                   <td className="border border-gray-200 px-4 py-2">{item.tender_name || "N/A"}</td>
//                   <td className="border border-gray-200 px-4 py-2 text-center">
//                     {editingIndex === index ? (
//                       <select
//                         className="border border-gray-300 rounded px-2 py-1"
//                         value={item.status || ""}
//                         onChange={(e) =>
//                           handleStatusChange(index, e.target.value)
//                         }
//                       >
//                         <option value="">Select a status</option>
//                         <option value="in_Review">in_Review</option>
//                         <option value="Pending">Pending</option>
//                         <option value="Published">Published</option>
//                         <option value="Cancel">Cancel</option>
//                       </select>
//                     ) : (
//                       <span
//                         className="text-blue-600 hover:underline cursor-pointer"
//                         onClick={() => setEditingIndex(index)}
//                       >
//                         Edit
//                       </span>
//                     )}
//                   </td>
//                   <span
//                         className="text-blue-600 hover:underline cursor-pointer"
//                         onClick={() => setEditingIndex(index)}
//                       >
//                          onClick={e => {
//                           e.stopPropagation();
//                           handleEdit(admin.id);
//                         }}
//                         View
//                       </span>
                
//                 </tr>
                
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         !loading &&
//         !error && <p className="text-gray-600">No tenders found.</p>
//       )}
//     </div>
//   );
// };

// export default AllPublishTender;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import ApiClient from "../../../Api/ApiClient"; // Import the custom axios instance

const AllPublishTender = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [editingIndex, setEditingIndex] = useState(null); // State to track which row is being edited
  const [selectedStatus, setSelectedStatus] = useState(""); // State to track selected status
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to fetch data from the API
  const fetchTenders = async () => {
    try {
      const response = await ApiClient.get("/admin/tender/publish-tender?key");
      if (response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setError("Unexpected response format.");
      }
    } catch (err) {
      setError("Failed to fetch tenders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchTenders();
  }, []);

  // Function to handle status change
  const handleStatusChange = (index, status) => {
    setEditingIndex(null); // Close the dropdown
    const updatedData = [...data];
    updatedData[index].status = status; // Update the status in local state
    setData(updatedData);

    // Optionally send the updated status to the API
    ApiClient.post(`/admin/tender/${data[index].id}/update-status`, {
      status,
    })
      .then(() => {
        console.log("Status updated successfully");
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  // Function to handle the "View" button click
  const handleView = (id) => {
    // Navigate to a new page with the tender ID
    navigate(`/publishedtender/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Tender Request</h2>
      {loading && <p className="text-gray-600">Loading tenders...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">ID</th>
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">Organization Name</th>
                <th className="border border-gray-200 px-4 py-2">Phone</th>
                <th className="border border-gray-200 px-4 py-2">Tender Name</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id || Math.random()} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.name || "N/A"}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {item.organization_name || "N/A"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{item.phone || "N/A"}</td>
                  <td className="border border-gray-200 px-4 py-2">{item.tender_name || "N/A"}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {editingIndex === index ? (
                      <select
                        className="border border-gray-300 rounded px-2 py-1"
                        value={item.status || ""}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                      >
                        <option value="">Select a status</option>
                        <option value="in_Review">in_Review</option>
                        <option value="Pending">Pending</option>
                        <option value="Published">Published</option>
                        <option value="Cancel">Cancel</option>
                      </select>
                    ) : (
                      <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setEditingIndex(index)}
                      >
                        Edit
                      </span>
                    )}
                    <span
                      className="text-blue-600 hover:underline cursor-pointer ml-4"
                      onClick={() => handleView(item.id)} // Use handleView to navigate
                    >
                      View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading &&
        !error && <p className="text-gray-600">No tenders found.</p>
      )}
    </div>
  );
};

export default AllPublishTender;



