


// import { useState } from "react";

// const ActivePackage = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const packages = [
//     { id: 91, name: "Grand", amount: "Free", duration: "12 months" },
//     { id: 90, name: "Rose", amount: "Popular", duration: "6 months" },
//   ];

//   const filteredPackages = packages.filter((pkg) =>
//     pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           + Create
//         </button>
//         <input
//           type="text"
//           placeholder="Search by Active Package"
//           className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-64 px-4 py-2"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPackages.map((pkg) => (
//               <tr key={pkg.id} className="border-t">
//                 <td className="px-4 py-2 text-sm text-gray-800">{pkg.id}</td>
//                 <td className="px-4 py-2 text-sm text-gray-800">{pkg.name}</td>
//                 <td className="px-4 py-2 text-sm text-gray-800">{pkg.amount}</td>
//                 <td className="px-4 py-2 text-sm text-gray-800">{pkg.duration}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//         >
//           &lt;
//         </button>
//         <span className="mx-2 px-4 py-1 bg-blue-600 text-white rounded-md">1</span>
//         <button
//           className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ActivePackage;


// import { useState, useEffect } from "react";

// const ActivePackage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch data from API when the component mounts
//   useEffect(() => {
//     const fetchPackages = async () => {
//       setLoading(true);
//       setError(null); // Reset error before new fetch
//       const myHeaders = new Headers();
//       myHeaders.append(
//         "Authorization",
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXFiYWwgMSIsImVtYWlsIjoiaXFiYWxAZ21haWwuY29tIiwicGhvbmUiOiI4ODAxOTk2MTA1MDIwIiwic3RhdHVzIjoxLCJ1cGRhdGVkX2J5Ijo2LCJpZCI6NiwidHlwZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNzMyMzM1NTE3LCJleHAiOjE3MzI0MjE5MTd9.IhvDJhsUmHIsUePMX8hNqmhOGUqb9ZvaaLis1awMY1Y"
//       );

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//       };

//       try {
//         const response = await fetch(
//           "http://192.168.0.230:9009/api/v1/admin/package", // Replace with your actual endpoint
//           requestOptions
//         );
//         const result = await response.json();
//         setPackages(result.data); // Assuming the API returns a data field with the list of packages
//       } catch (error) {
//         setError("Failed to fetch packages.");
//         console.error("Error fetching packages:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPackages();
//   }, []); // Empty array ensures this effect runs once when the component mounts

//   // Filter packages based on search term
//   const filteredPackages = packages.filter((pkg) =>
//     pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         {/* <button
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           + Create
//         </button> */}
//         <input
//           type="text"
//           placeholder="Search by Active Package"
//           className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-64 px-4 py-2"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPackages.map((pkg) => (
//               <tr key={pkg.id} className="border-t">
//                 <td className="px-4 py-2 text-sm text-gray-800">{pkg.id}</td>
//                 <td className="px-4 py-2 text-sm text-gray-800">{pkg.name}</td>
//                 <td className="px-4 py-2 text-sm text-gray-800">{pkg.amount}</td>
//                 <td className="px-4 py-2 text-sm text-gray-800">{pkg.duration}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center mt-4">
//         <button
//           className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//         >
//           &lt;
//         </button>
//         <span className="mx-2 px-4 py-1 bg-blue-600 text-white rounded-md">1</span>
//         <button
//           className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ActivePackage;



import { useState, useEffect } from "react";
import ApiClient from "../../Api/ApiClient";  // Assuming ApiClient is stored in the mentioned path

const ActivePackage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null); // Reset error before new fetch

      try {
        const response = await ApiClient.get("/admin/package");
        setPackages(response.data.data); // Assuming the API returns a data field with the list of packages
      } catch (error) {
        setError("Failed to fetch packages.");
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []); // Empty array ensures this effect runs once when the component mounts

  // Filter packages based on search term
  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by Active Package"
          className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-64 px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Duration</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg,index) => (
              <tr key={pkg.id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-800">{index +1}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.amount}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{pkg.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          &lt;
        </button>
        <span className="mx-2 px-4 py-1 bg-blue-600 text-white rounded-md">1</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ActivePackage;

