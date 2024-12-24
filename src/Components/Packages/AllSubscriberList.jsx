

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../Api/ApiClient";

const AllSubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [keyword, setKeyword] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/SubscriberDetails/${id}`);
  };

  const fetchSubscribers = async () => {
    const queryParams = new URLSearchParams();

    if (fromDate) queryParams.append('from_date', fromDate);
    if (toDate) queryParams.append('to_date', toDate);
    if (keyword) queryParams.append('key', keyword);
    if (paymentMethod) queryParams.append('payment_method', paymentMethod);
    if (paymentStatus) queryParams.append('payment_status', paymentStatus);

    try {
      setLoading(true);
      const response = await ApiClient.get(
        `/admin/package/subscribers?${queryParams.toString()}`
      );
      setSubscribers(response.data.data || []);
      setLoading(false);
    } catch (error) {
      setError("Error fetching subscribers. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [fromDate, toDate, keyword,paymentMethod, paymentStatus]);

  const totalPages = Math.ceil(subscribers.length / itemsPerPage);
  const currentItems = subscribers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">All Subscribers</h1>
      
      <div className="flex space-x-2 justify-end mb-4">
        <button
          onClick={() => window.print()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow text-xs"
        >
          Print
        </button>
      </div>

      {/* <div className="flex gap-1 items-center mb-4 bg-white shadow-md p-4 rounded-md">
        <div className="flex items-center space-x-1">
          <label className="text-gray-700 text-sm font-semibold">From Date</label>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span className="text-gray-500 text-sm">To Date</span>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-1">
          <label className="text-gray-700 text-sm font-semibold">Keyword</label>
          <input
            type="text"
            placeholder="Enter keyword"
            className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-1">
          <label className="text-gray-700 text-sm font-semibold">Payment</label>
          <input
            type="text"
            placeholder="Enter your Payment"
            className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}  // Update the paymentMethod state
          />
        </div>

        <div className="flex items-center space-x-1">
            <label className="text-gray-700 text-sm font-semibold">Status</label>
            <select
              className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
              onChange={(e) => setPaymentStatus(e.target.value)} // Handle status change
              value={paymentStatus}
            >
              <option value="">Status</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
      </div> */}

<div className="flex gap-2 items-center mb-4 bg-white shadow-md p-4 rounded-md">
  <div className="flex items-center space-x-1">
    <label className="text-gray-700 text-sm font-semibold">From Date</label>
    <input
      type="date"
      className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
    />
    <span className="text-gray-500 text-sm">To Date</span>
    <input
      type="date"
      className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
    />
  </div>
  
  <div className="flex items-center space-x-1">
    <label className="text-gray-700 text-sm font-semibold">Keyword</label>
    <input
      type="text"
      placeholder="Enter keyword"
      className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  </div>

  <div className="flex items-center space-x-1">
    <label className="text-gray-700 text-sm font-semibold">Payment</label>
    <input
      type="text"
      placeholder="Enter your Payment"
      className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
      value={paymentMethod}
      onChange={(e) => setPaymentMethod(e.target.value)}  // Update the paymentMethod state
    />
  </div>

  {/* Moved Status field below the others */}
  <div className="flex items-center space-x-1 mt-2">
    <label className="text-gray-700 text-sm font-semibold">Status</label>
    <select
      className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
      onChange={(e) => setPaymentStatus(e.target.value)} // Handle status change
      value={paymentStatus}
    >
      <option value="">Select Status</option>
      <option value="Success">Success</option>
      <option value="Failed">Failed</option>
    </select>
  </div>
</div>


      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : error ? (
          <p className="text-center py-4 text-red-500">{error}</p>
        ) : currentItems.length > 0 ? (
          <table className="w-full text-xs text-left text-gray-500 border">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">ID</th>
                <th className="px-3 py-2 border">Subscriber Name</th>
                <th className="px-3 py-2 border">Subscriber Phone</th>
                <th className="px-3 py-2 border">Package Duration</th>
                <th className="px-3 py-2 border text-center">Payment Method</th>
                <th className="px-3 py-2 border text-center">Payment Status</th>
                <th className="px-3 py-2 border">Paid Amount</th>
                <th className="px-3 py-2 border text-center">View</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((subscriber, index) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-3 py-2 border">{subscriber.user_name}</td>
                  <td className="px-3 py-2 border">{subscriber.phone}</td>
                  <td className="px-3 py-2 border">{subscriber.package_duration} Month</td>
                  <td className="px-3 py-2 border text-center">{subscriber.payment_method}</td>
                  <td className="px-3 py-2 border text-center">{subscriber.payment_status}</td>
                  <td className="px-3 py-2 border">{subscriber.recived_amount} BDT</td>
                  <td className="px-3 py-2 border text-center">
                    <button
                      onClick={() => handleView(subscriber.id)}
                      className="text-blue-600 hover:underline"
                    >
                      👁
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan="6" className="px-3 py-2 text-right border text-xs">
                  Total Amount
                </td>
                <td className="px-3 py-2 border font-bold text-center text-xs">
                  {subscribers.reduce((sum, sub) => sum + parseFloat(sub.recived_amount), 0)} BDT
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="text-center py-4">No subscribers found</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllSubscriberList;



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ApiClient from "../../Api/ApiClient";

// const AllSubscriberList = () => {
//   const [subscribers, setSubscribers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [data, setData] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // You can adjust this value as needed

//   // Another page
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const handleView = (id) => {
//     navigate(`/SubscriberDetails/${id}`); // Navigate to SubscriberDetails page with the id
//   };

//    const fetchSubscribers = async () => {
//     const queryParams = new URLSearchParams();
//     queryParams.append('from_date', fromDate || '');
//     queryParams.append('to_date', toDate ||'');
//     // queryParams.append('key', key || '');
  
//     console.log("quryParams:", queryParams.toString());
//     try {
//       setLoading(false);
//       const response = await ApiClient.get(
//         fromDate || toDate 
//         ? `/admin/package/subscribers?from_date={fromDate}&to_date={toDate}`
//         : `/admin/package/subscribers/`
      
//       );
//       console.log("API Response:", response.data.data); 
//       // return response.data; 
//       setSubscribers(response.data.data || []); 
//     } catch (error) {
//       console.error("Error fetching subscribers:", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchSubscribers();
//   }, []);

//   useEffect(() => {
//     fetchSubscribers();
//   }, [fromDate,toDate]);

//   // Calculate total pages
//   const totalPages = Math.ceil(subscribers.length / itemsPerPage);

//   // Slice the subscribers for the current page
//   const currentItems = subscribers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // -------------Params data & From------------
  
//   // Fetch data when dates change
//   useEffect(() => {
//     if (fromDate && toDate) {
//       fetchData();
//     }
//   }, [fromDate, toDate]);

//   const fetchData = async () => {
//     try {
//       const response = await fetchSubscribers(fromDate, toDate);
//       setData(response); // Assuming the response data is directly usable
//       console.log("Fetched Data:", response);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // -------------Params data & From------------

//   return (
//     <div className="p-6 bg-gradient-to-b from-white to-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-900">All Subscribers</h1>

//       {/* Action Buttons */}
//       <div className="flex space-x-2 justify-end">
//         <button
//           onClick={() => window.print()}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow text-xs"
//         >
//           Print
//         </button>
//       </div>

//       {/* Search Controls */}
//       <div className="flex gap-2 justify-start items-center mb-4 bg-white shadow-md p-4 rounded-md">
        
//         {/* <div className="flex items-center space-x-1">
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
//         </div> */}

// <div>
//       <div className="flex gap-2 justify-start items-center mb-4 bg-white shadow-md p-4 rounded-md">
       
//         <div className="flex items-center space-x-1">
//           <label className="text-gray-700 text-sm font-semibold">From Date</label>
//           <input
//             type="date"
//             className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//           <span className="text-gray-500 text-sm">To Date</span>
//           <input
//             type="date"
//             className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//           />
//         </div>
//       </div>

//       <div>
            
//       </div>
//     </div>

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
          // <div className="flex items-center space-x-1">
          //   <label className="text-gray-700 text-sm font-semibold">Payment Method</label>
          //   <select className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300">
          //     <option>All</option>
          //     <option>Credit Card</option>
          //     <option>Bank Transfer</option>
          //     <option>Mobile Payment</option>
          //     <option>Cash</option>
          //   </select>
          // </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto bg-white shadow-md rounded-md">
//         {loading ? (
//           <p className="text-center py-4">Loading...</p>
//         ) : error ? (
//           <p className="text-center py-4 text-red-500">{error}</p>
//         ) : currentItems.length > 0 ? (
//           <table className="w-full text-xs text-left text-gray-500 border">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//               <tr>
//                 <th className="px-3 py-2 border">ID</th>
//                 <th className="px-3 py-2 border">Subscriber Name</th>
//                 <th className="px-3 py-2 border">Subscriber Phone</th>
//                 {/* <th className="px-3 py-2 border">Package Start Time</th> */}
//                 {/* <th className="px-3 py-2 border">Package Expired Time</th> */}
//                 <th className="px-3 py-2 border">Package Duration</th>
//                 {/* <th className="px-3 py-2 border">Payment Time</th> */}
               
//                 <th className="px-3 py-2 border text-center">Payment Method</th>
//                 <th className="px-3 py-2 border text-center">Payment Status</th>
//                 <th className="px-3 py-2 border">Paid Amount</th>
//                 <th className="px-3 py-2 border text-center">View</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((subscriber, index) => (
//                 <tr key={subscriber.id} className="hover:bg-gray-50">
//                   <td className="px-3 py-2 border">{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                   <td className="px-3 py-2 border">{subscriber.user_name}</td>
//                   <td className="px-3 py-2 border">{subscriber.phone}</td>
//                   {/* <td className="px-3 py-2 border">{subscriber.package_start_date}</td> */}
//                   {/* <td className="px-3 py-2 border">{subscriber.package_expired_date}</td> */}
//                   <td className="px-3 py-2 border">{subscriber.package_duration} Month</td>
//                   {/* <td className="px-3 py-2 border">{subscriber.payment_time}</td> */}
                  
//                   <td className="px-3 py-2 border text-center">{subscriber.payment_method}</td>
                  
//                   <td className="px-3 py-2 border text-center">{subscriber.payment_status}</td>
//                   <td className="px-3 py-2 border">{subscriber.recived_amount} BDT</td>
//                   <td className="px-4 py-2 border">
//                 <button
//                   onClick={() => handleView(subscriber.id)} // Navigate to SubscriberDetails with the subscriber's id
//                   className="text-blue-600 hover:underline"
//                 >
//                   <button className="text-gray-600 hover:text-gray-800">
//                     👁
//                   </button>
//                 </button>
//               </td>

//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//               <tr className="bg-gray-100 font-semibold">
//                 <td colSpan="6" className="px-3 py-2 text-right border text-xs">
//                   Total Amount
//                 </td>
//                 <td className="px-3 py-2 border font-bold text-center text-xs">
//                   {subscribers.reduce((sum, sub) => sum + parseFloat(sub.recived_amount), 0)} BDT
//                 </td>
//                 <td></td>
//               </tr>
//             </tfoot>
//           </table>
//         ) : (
//           <p className="text-center py-4">No subscribers found</p>
//         )}
//       </div>

//       {/* Pagination Buttons */}
//       <div className="flex justify-center mt-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageChange(i + 1)}
//             className={`px-4 py-2 mx-1 rounded ${
//               currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllSubscriberList;




// ----------1st Design code Not Api-------
         // const AllSubscriberList = () => {
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
//             {/* Sample Row */}
//             <tr className="hover:bg-gray-50">
//               <td className="px-3 py-2 border">#101</td>
//               <td className="px-3 py-2 border">John Doe</td>
//               <td className="px-3 py-2 border">+8801712345678</td>
//               <td className="px-3 py-2 border">2024-12-01 10:00 AM</td>
//               <td className="px-3 py-2 border">2024-12-15 10:00 AM</td>
//               <td className="px-3 py-2 border">14 Days</td>
//               <td className="px-3 py-2 border">2024-12-01 09:00 AM</td>
//               <td className="px-3 py-2 border">
//                 <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
//                   Paid
//                 </span>
//               </td>
//               <td className="px-3 py-2 border text-center">
//                 <button className="text-blue-600 hover:underline text-xs">View</button>
//               </td>
//             </tr>
            
//           </tbody>
//           <tfoot>
//             <tr className="bg-gray-100 font-semibold">
             
//               <td colSpan="7" className="px-3 py-2 text-right border text-xs">
//                 Total Amount
//               </td>
//               <td className="px-3 py-2 border font-bold text-center text-xs">15000.00</td>
//             </tr>
//           </tfoot>
          
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllSubscriberList;
// ----------1st Design code Not Api-------







