

// const ViewTenderDetails = () => {
//   return (
//       <div className="container mx-auto p-6">
//         <h2 className="text-bold  text-2xl">Tender Published Request Details</h2>
//         <div className="bg-white shadow-md rounded-lg p-6">
//           {/* Header Section */}
//           <div className="flex items-center justify-between mb-6">
           
//           </div>
  
//           {/* Tender Details */}
//           <div className="flex items-center justify-start mb-8">
//   {/* Image Container */}
//   <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
//     <img
//       src="/src/image/Rectangle 82.png"
//       alt="Logo"
//       className="rounded-full"
//       style={{ height: '90px', width: '100px' }}
//     />
//   </div>

//   {/* Text Container */}
//   <div className="text-left">
//     <p className="text-gray-500">Tender Name</p>
//     {/* Uncomment the next line if you want to display the heading */}
//     {/* <h2 className="text-xl font-semibold text-gray-700">Tender for buy cars</h2> */}
//   </div>
// </div>

  
//           {/* Tender Information Table */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
//             {[
              
//               ["Organization Name", ],
//               ["Name", ],
//               ["Designation", ],
//               ["Email", ],
//               ["Phone", ],
//               ["Reference No", ],
//             ].map(([label, value], idx) => (
//               <div
//                 key={idx}
//                 className="border-b pb-2 flex justify-between items-center"
//               >
//                 <span className="font-medium text-gray-600">{label}</span>
//                 <span className="text-gray-800">{value}</span>
//               </div>
//             ))}
//           </div>
  
//           {/* PDF Button */}
//           <div className="mt-6 flex justify-center">
//             <button className="bg-gray-200 px-6 py-3 rounded-md text-gray-700 hover:bg-gray-300">
//               View the PDF
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
// export default ViewTenderDetails


// import { useEffect, useState } from "react";
// import ApiClient from "../../../Api/ApiClient"; // Assuming your ApiClient is correctly set up

// const ViewTenderDetails = () => {
//   const [tender, setTender] = useState(null); // State to hold tender details
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const tenderId = 100; // Assuming the tender ID is 100 for example purposes

//   // Fetch tender details from the API
//   useEffect(() => {
//     const fetchTenderDetails = async () => {
//       try {
//         const response = await ApiClient.get(`/admin/tender/tender-request/${tenderId}`);
//         setTender(response.data.data); // Set the actual tender data from the response
//         console.log(response.data.data); // Debug log
//       } catch (err) {
//         setError("Failed to load tender details.");
//         console.error("Error fetching tender details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTenderDetails();
//   }, [tenderId]);

//   if (loading) {
//     return <p className="text-gray-600">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">{error}</p>;
//   }

//   if (!tender) {
//     return <p className="text-gray-600">No tender data available.</p>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-bold text-2xl">Tender Published Request Details</h2>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-6">
//           {/* Additional content can be added here */}
//         </div>

//         {/* Tender Details */}
//         <div className="flex items-center justify-start mb-8">
//           {/* Image Container */}
//           <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
//             <img
//               src={`ApiClient/images/${tender.company_logo}`} // Dynamically set logo from tender data
//               alt="Logo"
//               className="rounded-full"
//               style={{ height: '90px', width: '100px' }}
//             />
//           </div>

//           {/* Text Container */}
//           <div className="text-left">
//             <p className="text-gray-500">Tender Name</p>
//             <h2 className="text-xl font-semibold text-gray-700">{tender.tender_name}</h2>
//           </div>
//         </div>

//         {/* Tender Information Table */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
//           {[
//             ["Organization Name", tender.organization_name],
//             ["Name", tender.name],
//             ["Designation", tender.designation],
//             ["Email", tender.email],
//             ["Phone", tender.phone],
//             ["Reference No", tender.ref_name || "N/A"] // Handling null ref_name
//           ].map(([label, value], idx) => (
//             <div key={idx} className="border-b pb-2 flex justify-between items-center">
//               <span className="font-medium text-gray-600">{label}</span>
//               <span className="text-gray-800">{value || "N/A"}</span>
//             </div>
//           ))}
//         </div>

//         {/* PDF Button */}
//         <div className="mt-6 flex justify-center">
//           <button className="bg-gray-200 px-6 py-3 rounded-md text-gray-700 hover:bg-gray-300">
//             View the PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewTenderDetails;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ApiClient from "../../../Api/ApiClient"; // Assuming your ApiClient is correctly set up
// import { IoClose } from "react-icons/io5"; // Importing a cross icon from react-icons

// const ViewTenderDetails = () => {
//   const [tender, setTender] = useState(null); // State to hold tender details
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const tenderId = 100; // Assuming the tender ID is 100 for example purposes
//   const navigate = useNavigate();

//   // Fetch tender details from the API
//   useEffect(() => {
//     const fetchTenderDetails = async () => {
//       try {
//         const response = await ApiClient.get(`/admin/tender/tender-request/${tenderId}`);
//         setTender(response.data.data); // Set the actual tender data from the response
//         console.log(response.data.data); // Debug log
//       } catch (err) {
//         setError("Failed to load tender details.");
//         console.error("Error fetching tender details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTenderDetails();
//   }, [tenderId]);

//   const handleViewPDF = () => {
//     navigate(`/tender-pdf-view/${tenderId}`); // Navigate to the PDF view page
//   };

//   const handleGoBack = () => {
//     navigate(-1); // Navigate back to the previous page
//   };

//   if (loading) {
//     return <p className="text-gray-600">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">{error}</p>;
//   }

//   if (!tender) {
//     return <p className="text-gray-600">No tender data available.</p>;
//   }

//   return (
//     <div className="container mx-auto p-6 relative">
//       {/* Cross Icon */}
//       <button
//         onClick={handleGoBack}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         aria-label="Close"
//       >
//         <IoClose size={24} />
//       </button>

//       {/* Header */}
//       <h2 className="text-bold text-2xl mb-6 text-center">Tender Published Request Details</h2>
      
//       {/* Card for Tender Details */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         {/* Tender Details */}
//         <div className="flex items-center justify-start mb-8">
//           {/* Image */}
//           <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
//             <img
//               src={`ApiClient/images/${tender.company_logo}`} // Dynamically set logo from tender data
//               alt="Logo"
//               className="rounded-full"
//               style={{ height: '90px', width: '100px' }}
//             />
//           </div>

//           {/* Tender Name */}
//           <div className="text-left">
//             <p className="text-gray-500">Tender Name</p>
//             <h2 className="text-xl font-semibold text-gray-700">{tender.tender_name}</h2>
//           </div>
//         </div>

//         {/* Tender Information Table */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
//           {[
//             ["Organization Name", tender.organization_name],
//             ["Name", tender.name],
//             ["Designation", tender.designation],
//             ["Email", tender.email],
//             ["Phone", tender.phone],
//             ["Reference No", tender.ref_name || "N/A"], // Handling null ref_name
//           ].map(([label, value], idx) => (
//             <div key={idx} className="border-b pb-2 flex justify-between items-center">
//               <span className="font-medium text-gray-600">{label}</span>
//               <span className="text-gray-800">{value || "N/A"}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* View PDF Button */}
//       <div className="mt-6 flex justify-center">
//         <button
//           onClick={handleViewPDF}
//           className="bg-blue-500 px-6 py-3 rounded-md text-white hover:bg-blue-600"
//         >
//           View the PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewTenderDetails;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../Api/ApiClient"; // Assuming your ApiClient is correctly set up
import { IoClose } from "react-icons/io5"; // Importing a cross icon from react-icons

const ViewTenderDetails = () => {
  const [tender, setTender] = useState(null); // State to hold tender details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const tenderId = 100; // Example tender ID
  const navigate = useNavigate();

  // Base URL for images/PDF
  const PHOTO_BASE_URL_Admin = "https://your-base-url.com/uploads/";

  // Fetch tender details from the API
  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        const response = await ApiClient.get(`/admin/tender/tender-request/${tenderId}`);
        setTender(response.data.data); // Set the actual tender data from the response
        console.log(response.data.data); // Debug log
      } catch (err) {
        setError("Failed to load tender details.");
        console.error("Error fetching tender details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenderDetails();
  }, [tenderId]);

  const handleViewPDF = () => {
    // Navigate to a new route to view the PDF
    navigate(`/tender-pdf-view/${tenderId}`); // Make sure you have a route for this page
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return <p className="text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!tender) {
    return <p className="text-gray-600">No tender data available.</p>;
  }

  return (
    <div className="container mx-auto p-6 relative">
      {/* Cross Icon */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <IoClose size={24} />
      </button>

      {/* Header */}
      <h2 className="text-bold text-2xl mb-6 text-center">Tender Published Request Details</h2>

      {/* Card for Tender Details */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Tender Details */}
        <div className="flex items-center justify-start mb-8">
          {/* Image */}
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            <img
              src={`${PHOTO_BASE_URL_Admin}${tender.company_logo}`} // Dynamically set logo from tender data
              alt="Logo"
              className="rounded-full"
              style={{ height: "90px", width: "100px" }}
            />
          </div>

          {/* Tender Name */}
          <div className="text-left">
            <p className="text-gray-500">Tender Name</p>
            <h2 className="text-xl font-semibold text-gray-700">{tender.tender_name}</h2>
          </div>
        </div>

        {/* Tender Information Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
          {[
            ["Organization Name", tender.organization_name],
            ["Name", tender.name],
            ["Designation", tender.designation],
            ["Email", tender.email],
            ["Phone", tender.phone],
            ["Reference No", tender.ref_name || "N/A"], // Handling null ref_name
          ].map(([label, value], idx) => (
            <div key={idx} className="border-b pb-2 flex justify-between items-center">
              <span className="font-medium text-gray-600">{label}</span>
              <span className="text-gray-800">{value || "N/A"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* View PDF Button */}
      {/* <div className="mt-6 flex justify-center">
        <button
          onClick={handleViewPDF}
          className="bg-blue-500 px-6 py-3 rounded-md text-white hover:bg-blue-600"
        >
          View the PDF
        </button>
      </div> */}

      {/* PDF File Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 w-full mt-6">
        <input
          id="pdf_file"
          name="pdf_file"
          type="text"
          value={tender.pdf_file || "N/A"}
          readOnly
          className="p-2 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs w-full"
        />
        <a
          href={`${PHOTO_BASE_URL_Admin}${tender.pdf_file}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center border border-gray-300 px-2 py-2 text-xs rounded-md shadow-sm w-full sm:w-1/3 bg-white text-black hover:text-blue-600 hover:border-blue-600"
        >
          📄 View PDF
        </a>
      </div>
    </div>
  );
};

export default ViewTenderDetails;
