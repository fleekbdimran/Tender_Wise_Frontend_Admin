


const AllSubscriberList = () => {
  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Action Buttons */}
      <div className="flex space-x-2 justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow text-xs">
          Print
        </button>
      </div>

      {/* Search Controls */}
      <div className="flex gap-2 justify-start items-center mb-4 bg-white shadow-md p-4 rounded-md">
        {/* Date Search */}
        <div className="flex items-center space-x-1">
          <label className="text-gray-700 text-sm font-semibold">From Date</label>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
          />
          <span className="text-gray-500 text-sm">To Date</span>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Keyword and Payment Method */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <label className="text-gray-700 text-sm font-semibold">Keyword</label>
            <input
              type="text"
              placeholder="Enter keyword"
              className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex items-center space-x-1">
            <label className="text-gray-700 text-sm font-semibold">Payment Method</label>
            <select className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300">
              <option>All</option>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>Mobile Payment</option>
              <option>Cash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        <table className="w-full text-xs text-left text-gray-500 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">ID</th>
              <th className="px-3 py-2 border">Subscriber Name</th>
              <th className="px-3 py-2 border">Subscriber Phone</th>
              <th className="px-3 py-2 border">Package Start Time</th>
              <th className="px-3 py-2 border">Package Expired Time</th>
              <th className="px-3 py-2 border">Package Duration</th>
              <th className="px-3 py-2 border">Payment Time</th>
              <th className="px-3 py-2 border">Paid Amount</th>
              <th className="px-3 py-2 border text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample Row */}
            <tr className="hover:bg-gray-50">
              <td className="px-3 py-2 border">#101</td>
              <td className="px-3 py-2 border">John Doe</td>
              <td className="px-3 py-2 border">+8801712345678</td>
              <td className="px-3 py-2 border">2024-12-01 10:00 AM</td>
              <td className="px-3 py-2 border">2024-12-15 10:00 AM</td>
              <td className="px-3 py-2 border">14 Days</td>
              <td className="px-3 py-2 border">2024-12-01 09:00 AM</td>
              <td className="px-3 py-2 border">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                  Paid
                </span>
              </td>
              <td className="px-3 py-2 border text-center">
                <button className="text-blue-600 hover:underline text-xs">View</button>
              </td>
            </tr>
            
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold">
             
              <td colSpan="7" className="px-3 py-2 text-right border text-xs">
                Total Amount
              </td>
              <td className="px-3 py-2 border font-bold text-center text-xs">15000.00</td>
            </tr>
          </tfoot>
          
        </table>
      </div>
    </div>
  );
};

export default AllSubscriberList;


// import { useState, useEffect } from "react";
// import ApiClient from "../../Api/ApiClient"; // Import your ApiClient

// // API Utility for Fetching Data (using ApiClient)
// const fetchSubscribers = async () => {
//   try {
//     const response = await ApiClient.get('/admin/package/subscribers');
//     console.log("Fetched subscribers:", response.data); // Log the response to check if data is coming through
//     return response.data || [];
//   } catch (error) {
//     console.error("Error fetching subscribers:", error);
//     return [];
//   }
// };

// const AllSubscriberList = () => {
//   const [subscribers, setSubscribers] = useState([]);

//   // Fetch the subscriber data on mount
//   useEffect(() => {
//     const loadSubscribers = async () => {
//       const fetchedSubscribers = await fetchSubscribers();
//       setSubscribers(fetchedSubscribers); // Set the data to the state
//     };
//     loadSubscribers();
//   }, []); // Run the effect only once on component mount

//   return (
//     <div className="p-6 bg-gradient-to-b from-white to-gray-100 min-h-screen">
//       {/* Action Buttons */}
//       <div className="flex space-x-2 justify-end">
//         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow text-xs">
//           Print
//         </button>
//       </div>

//       {/* Search Controls */}
//       <div className="flex gap-2 justify-start items-center mb-4 bg-white shadow-md p-4 rounded-md">
//         {/* Date Search */}
//         <div className="flex items-center space-x-1">
//           <label className="text-gray-700 text-sm font-semibold">From Date</label>
//           <input
//             type="date"
//             className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
//           />
//           <span className="text-gray-500 text-sm">To Date</span>
//           <input
//             type="date"
//             className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
//           />
//         </div>

//         {/* Keyword and Payment Method */}
//         <div className="flex items-center space-x-2">
//           <div className="flex items-center space-x-1">
//             <label className="text-gray-700 text-sm font-semibold">Keyword</label>
//             <input
//               type="text"
//               placeholder="Enter keyword"
//               className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
//             />
//           </div>
//           <div className="flex items-center space-x-1">
//             <label className="text-gray-700 text-sm font-semibold">Payment Method</label>
//             <select className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300">
//               <option>All</option>
//               <option>Credit Card</option>
//               <option>Bank Transfer</option>
//               <option>Mobile Payment</option>
//               <option>Cash</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto bg-white shadow-md rounded-md">
//         <table className="w-full text-xs text-left text-gray-500 border">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//             <tr>
//               <th className="px-3 py-2 border">ID</th>
//               <th className="px-3 py-2 border">Subscriber Name</th>
//               <th className="px-3 py-2 border">Subscriber Phone</th>
//               <th className="px-3 py-2 border">Package Start Time</th>
//               <th className="px-3 py-2 border">Package Expired Time</th>
//               <th className="px-3 py-2 border">Package Duration</th>
//               <th className="px-3 py-2 border">Payment Time</th>
//               <th className="px-3 py-2 border">Paid Amount</th>
//               <th className="px-3 py-2 border text-center">View</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subscribers.length > 0 ? (
//               subscribers.map((subscriber) => (
//                 <tr key={subscriber.id} className="hover:bg-gray-50">
//                   <td className="px-3 py-2 border">{subscriber.id}</td>
//                   <td className="px-3 py-2 border">{subscriber.name}</td>
//                   <td className="px-3 py-2 border">{subscriber.phone}</td>
//                   <td className="px-3 py-2 border">{subscriber.packageStartTime}</td>
//                   <td className="px-3 py-2 border">{subscriber.packageExpiredTime}</td>
//                   <td className="px-3 py-2 border">{subscriber.packageDuration}</td>
//                   <td className="px-3 py-2 border">{subscriber.paymentTime}</td>
//                   <td className="px-3 py-2 border">{subscriber.paidAmount}</td>
//                   <td className="px-3 py-2 border text-center">
//                     <button className="text-blue-600 hover:underline text-xs">View</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center px-3 py-2 border">No subscribers found</td>
//               </tr>
//             )}
//           </tbody>
//           <tfoot>
//             <tr className="bg-gray-100 font-semibold">
//               <td colSpan="7" className="px-3 py-2 text-right border text-xs">
//                 Total Amount
//               </td>
//               <td className="px-3 py-2 border font-bold text-center text-xs">
//                 {subscribers.reduce((total, subscriber) => total + parseFloat(subscriber.paidAmount || 0), 0).toFixed(2)}
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllSubscriberList;


