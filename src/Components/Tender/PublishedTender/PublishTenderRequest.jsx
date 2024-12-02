// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ApiClient from "../../../Api/ApiClient";
// import Swal from "sweetalert2";
// import { Pagination } from "antd"; // Importing Ant Design Pagination component

// const PublishTenderRequest = () => {
//   const [data, setData] = useState([]); // Store all tenders
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1); // Current page
//   const [pageSize] = useState(10); // Number of items per page
//   const navigate = useNavigate();

//   // Fetch Tender Data
//   const fetchTenders = async () => {
//     try {
//       const response = await ApiClient.get("/admin/tender/publish-tender");
//       if (response.data?.data) {
//         setData(response.data.data); // Store all tenders data
//       } else {
//         throw new Error("Unexpected API response format.");
//       }
//     } catch (err) {
//       console.error("Error fetching tenders:", err);
//       setError("Failed to load tenders. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update Tender Status with Success/Failure Pop-up
//   const handleStatusChange = async (index, status) => {
//     const tenderId = data[index]?.id;
//     if (!tenderId) {
//       alert("Invalid Tender ID");
//       return;
//     }

//     try {
//       const requestUrl = '/admin/tender/publish-tender?status=published';
//       const response = await ApiClient.patch(requestUrl, { status });

//       if (response.status === 200 || response.status === 201) {
//         const updatedData = [...data];
//         updatedData[index].status = status;
//         setData(updatedData);

//         // Success Pop-up Message
//         await Swal.fire({
//           title: "Success!",
//           text: "Tender status updated successfully!",
//           icon: "success",
//           confirmButtonText: "OK",
//         });

//         setEditingIndex(null); // Close the dropdown
//       } else {
//         throw new Error(response.data.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.error("Status update error:", error);

//       // Error Pop-up Message
//       Swal.fire({
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to update status. Please try again.",
//         icon: "error",
//         confirmButtonText: "Try Again",
//       });
//     }
//   };

//   // View Tender Details
//   const handleView = (id) => {
//     navigate(`/publishedtender/${id}`);
//   };

//   useEffect(() => {
//     fetchTenders(); // Fetch tenders on component mount
//   }, []);

//   // Function to get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "in_review":
//         return "text-yellow-600";
//       case "pending":
//         return "text-gray-600";
//       case "published":
//         return "text-green-600";
//       case "cancel":
//         return "text-red-600";
//       default:
//         return "text-black";
//     }
//   };

//   // Paginate Data
//   const paginateData = (page, pageSize) => {
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     return data.slice(startIndex, endIndex);
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const paginatedData = paginateData(currentPage, pageSize); // Get paginated data

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Tender Requests</h2>

//       {loading && <p className="text-gray-600">Loading...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {!loading && !error && data.length > 0 ? (
//         <>
//           <table className="min-w-full border border-gray-200 text-left">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-4 py-2 border">ID</th>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Organization</th>
//                 <th className="px-4 py-2 border">Phone</th>
//                 <th className="px-4 py-2 border">Tender Name</th>
//                 <th className="px-4 py-2 border">Status</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((item, index) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{index + 1}</td>
//                   <td className="px-4 py-2 border">{item.name || "N/A"}</td>
//                   <td className="px-4 py-2 border">{item.organization_name || "N/A"}</td>
//                   <td className="px-4 py-2 border">{item.phone || "N/A"}</td>
//                   <td className="px-4 py-2 border">{item.tender_name || "N/A"}</td>
//                   <td className="px-4 py-2 border">
//                     {editingIndex === index ? (
//                       <select
//                         value={item.status || ""}
//                         onChange={(e) => handleStatusChange(index, e.target.value)}
//                         className="border rounded px-2 py-1"
//                       >
//                         <option value="">Select</option>
//                         <option value="in_review">In Review</option>
//                         <option value="pending">Pending</option>
//                         <option value="published">Published</option>
//                         <option value="cancel">Cancel</option>
//                       </select>
//                     ) : (
//                       <span
//                         onClick={() => setEditingIndex(index)}
//                         className={`cursor-pointer ${getStatusColor(item.status)}`}
//                       >
//                         {item.status || "Edit"}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => handleView(item.id)}
//                       className="text-blue-600 hover:underline"
//                     >
//                       <button className="text-gray-600 hover:text-gray-800">👁</button>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination Component */}
//           <div className="mt-4 flex justify-center">
//             <Pagination
//               current={currentPage}
//               pageSize={pageSize}
//               total={data.length}
//               onChange={handlePageChange}
//               showSizeChanger={false} // Optional: hides the page size changer
//             />
//           </div>
//         </>
//       ) : (
//         !loading && <p className="text-gray-600">No tenders found.</p>
//       )}
//     </div>
//   );
// };

// export default PublishTenderRequest;



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ApiClient from "../../../Api/ApiClient";
// import { Pagination } from "antd"; // Importing Ant Design Pagination component

// const PublishTenderRequest = () => {
//   const [data, setData] = useState([]); // Store published tenders
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1); // Current page
//   const [pageSize] = useState(10); // Number of items per page
//   const navigate = useNavigate();

//   // Fetch Tender Data
//   const fetchTenders = async () => {
//     try {
//       const response = await ApiClient.get("/admin/tender/publish-tender");
//       if (response.data?.data) {
//         // Filter tenders to include only published ones
//         const publishedTenders = response.data.data.filter(
//           (tender) => tender.status === "published"
//         );
//         setData(publishedTenders);
//       } else {
//         throw new Error("Unexpected API response format.");
//       }
//     } catch (err) {
//       console.error("Error fetching tenders:", err);
//       setError("Failed to load tenders. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // View Tender Details
//   const handleView = (id) => {
//     navigate(`/publishedtender/${id}`);
//   };

//   useEffect(() => {
//     fetchTenders(); // Fetch tenders on component mount
//   }, []);

//   // Paginate Data
//   const paginateData = (page, pageSize) => {
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     return data.slice(startIndex, endIndex);
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const paginatedData = paginateData(currentPage, pageSize); // Get paginated data

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Published Tender Requests</h2>

//       {loading && <p className="text-gray-600">Loading...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {!loading && !error && data.length > 0 ? (
//         <>
//           <table className="min-w-full border border-gray-200 text-left">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-4 py-2 border">ID</th>
//                 <th className="px-4 py-2 border">Name</th>
//                 <th className="px-4 py-2 border">Organization</th>
//                 <th className="px-4 py-2 border">Phone</th>
//                 <th className="px-4 py-2 border">Tender Name</th>
//                 <th className="px-4 py-2 border">Status</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((item, index) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{index + 1}</td>
//                   <td className="px-4 py-2 border">{item.name || "N/A"}</td>
//                   <td className="px-4 py-2 border">{item.organization_name || "N/A"}</td>
//                   <td className="px-4 py-2 border">{item.phone || "N/A"}</td>
//                   <td className="px-4 py-2 border">{item.tender_name || "N/A"}</td>
//                   <td className="px-4 py-2 border text-green-600 font-semibold">
//                     Published
//                   </td>
//                   <td className="px-4 py-2 border text-center">
//                     <button
//                       onClick={() => handleView(item.id)}
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       👁
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination Component */}
//           <div className="mt-4 flex justify-center">
//             <Pagination
//               current={currentPage}
//               pageSize={pageSize}
//               total={data.length}
//               onChange={handlePageChange}
//               showSizeChanger={false} // Optional: hides the page size changer
//             />
//           </div>
//         </>
//       ) : (
//         !loading && <p className="text-gray-600">No published tenders found.</p>
//       )}
//     </div>
//   );
// };

// export default PublishTenderRequest;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../Api/ApiClient";
import Swal from "sweetalert2";
import { Pagination } from "antd"; // Importing Ant Design Pagination component

const PublishTenderRequest = () => {
  const [data, setData] = useState([]); // Store published tenders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize] = useState(10); // Number of items per page
  const [editingIndex, setEditingIndex] = useState(null); // Track editing index
  const navigate = useNavigate();

  // Fetch Published Tenders
  const fetchTenders = async () => {
    try {
      const response = await ApiClient.get("/admin/tender/publish-tender");
      if (response.data?.data) {
        // Filter tenders to include only "published" status
        const publishedTenders = response.data.data.filter(
          (tender) => tender.status === "published"
        );
        setData(publishedTenders);
      } else {
        throw new Error("Unexpected API response format.");
      }
    } catch (err) {
      console.error("Error fetching tenders:", err);
      setError("Failed to load tenders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Update Tender Status with Success/Failure Pop-up
  const handleStatusChange = async (index, status) => {
    const tenderId = data[index]?.id;
    if (!tenderId) {
      alert("Invalid Tender ID");
      return;
    }

    try {
      const requestUrl = `/admin/tender/tender-request/${tenderId}`;
      const response = await ApiClient.patch(requestUrl, { status });

      if (response.status === 200 || response.status === 201) {
        const updatedData = [...data];
        updatedData[index].status = status;

        // Update the list only if the status remains "published"
        const updatedPublishedTenders = updatedData.filter(
          (tender) => tender.status === "published"
        );
        setData(updatedPublishedTenders);

        // Success Pop-up Message
        await Swal.fire({
          title: "Success!",
          text: "Tender status updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        setEditingIndex(null); // Close the dropdown
      } else {
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Status update error:", error);

      // Error Pop-up Message
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update status. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // View Tender Details
  const handleView = (id) => {
    navigate(`/publishedtender/${id}`);
  };

  useEffect(() => {
    fetchTenders(); // Fetch tenders on component mount
  }, []);

  // Paginate Data
  const paginateData = (page, pageSize) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = paginateData(currentPage, pageSize); // Get paginated data

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Published Tender Requests</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && data.length > 0 ? (
        <>
          <table className="min-w-full border border-gray-200 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Organization</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Tender Name</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{item.organization_name || "N/A"}</td>
                  <td className="px-4 py-2 border">{item.phone || "N/A"}</td>
                  <td className="px-4 py-2 border">{item.tender_name || "N/A"}</td>
                  <td className="px-4 py-2 border">
                    {editingIndex === index ? (
                      <select
                        value={item.status || ""}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="">Select</option>
                        <option value="in_review">In Review</option>
                        <option value="pending">Pending</option>
                        <option value="published">Published</option>
                        <option value="cancel">Cancel</option>
                      </select>
                    ) : (
                      <span
                        onClick={() => setEditingIndex(index)}
                        className="text-green-600 font-semibold cursor-pointer"
                      >
                        Published
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleView(item.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      👁
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Component */}
          <div className="mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data.length}
              onChange={handlePageChange}
              showSizeChanger={false} // Optional: hides the page size changer
            />
          </div>
        </>
      ) : (
        !loading && <p className="text-gray-600">No published tenders found.</p>
      )}
    </div>
  );
};

export default PublishTenderRequest;


