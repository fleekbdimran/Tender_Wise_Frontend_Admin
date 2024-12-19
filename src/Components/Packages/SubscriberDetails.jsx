import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams for dynamic route handling
import Profile from "./Profile/Profile";
import ApiClient from "../../Api/ApiClient"; // Adjust the path based on your setup
import { PHOTO_BASE_URL } from "../../Api/config"; // Ensure correct import path for the config file

const SubscriberDetails = () => {
  const { id } = useParams(); // Get dynamic ID from route parameters
  const [subscriberInfo, setSubscriberInfo] = useState({});
  const [packageInfo, setPackageInfo] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    const fetchSubscriberDetails = async () => {
      try {
        const response = await ApiClient.get(`/admin/package/subscribers/${id}`);
        const data = response.data;

        setSubscriberInfo({
          user_name: data?.data?.user_name || "N/A",
          phone: data?.data?.phone || "N/A",
          email: data?.data?.email || "N/A",
          designation: data?.data?.designation || "N/A",
          organizationName: data?.data?.organization_name || "N/A",
          address: data?.data?.address || "N/A",
          city: data?.data?.city || "N/A",
          photo: data?.data?.photo || "", // Adding photo URL here
        });

        setPackageInfo({
          packageId: data?.data?.package_id || "N/A",
          packageName: data?.data?.package_name || "N/A",
          packageDuration: data?.data?.package_duration || "N/A",
          packageAmount: data?.data?.pay_amount || "N/A",
          packageStartTime: data?.data?.package_start_date || "N/A",
          packageEndTime: data?.data?.package_expired_date || "N/A",
        });

        setPaymentDetails({
          orderId: data?.data?.order_id || "N/A",
          transactionId: data?.data?.tran_id || "N/A",
          account: data?.data?.acc_number || "N/A",
          customerPhoneNumber: data?.data?.cus_phone_no || "N/A",
          initiateAt: data?.data?.initiate_at || "N/A",
          paymentStatus: data?.data?.payment_status || "N/A",
          spOrderId: data?.data?.sp_order_id || "N/A",
          storeId: data?.data?.store_id || "N/A",
          invoiceNo: data?.data?.invoice_no || "N/A",
          paymentMethod: data?.data?.method || "N/A",
          paymentTimeStatus: data?.data?.payment_time || "N/A",
          status: data?.data?.status || "N/A",
          receivedAmount: data?.data?.recived_amount || "N/A",
          cardHolderName: data?.data?.card_holder_name || "N/A",
          usdRate: data?.data?.usd_rate || "N/A",
          bankStatus: data?.data?.bank_status || "N/A",
          usdAmount: data?.data?.usd_amount || "N/A",
          discount: data?.data?.discount_amount || "N/A",
        });
      } catch (error) {
        console.error("Error fetching subscriber details:", error);
      }
    };

    if (id) {
      fetchSubscriberDetails(); // Only fetch data if ID is available
    }
  }, [id]); // Add ID as a dependency to re-fetch when it changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">
      {/* Profile Component */}
      <Profile user_name={subscriberInfo.user_name} photo={subscriberInfo.photo} />

      {/* Subscriber Information */}
      <div className="flex w-full gap-5">
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Subscriber Information</h3>
          <div className="space-y-4">
            {Object.entries(subscriberInfo).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Package Information */}
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Package Information</h3>
          <div className="space-y-4">
            {Object.entries(packageInfo).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Transaction Details */}
      <h2 className="text-xl font-bold mb-4 text-center">Payment Transaction Details</h2>
      <div className="flex w-full gap-6">
        {[paymentDetails].map((section, cardIndex) => (
          <React.Fragment key={cardIndex}>
            {/* First Card */}
            <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                {Object.entries(section)
                  .slice(0, 9)
                  .map(([key, value], index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
                      <p>{value || "N/A"}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Second Card */}
            <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                {Object.entries(section)
                  .slice(9, 18)
                  .map(([key, value], index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
                      <p>{value || "N/A"}</p>
                    </div>
                  ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SubscriberDetails;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // Import useParams for dynamic route handling
// import Profile from "./Profile/Profile";
// import ApiClient from "../../Api/ApiClient"; // Adjust the path based on your setup

// const SubscriberDetails = () => {
//   const { id } = useParams(); // Get dynamic ID from route parameters
//   const [subscriberInfo, setSubscriberInfo] = useState({});
//   const [packageInfo, setPackageInfo] = useState({});
//   const [paymentDetails, setPaymentDetails] = useState({});

//   useEffect(() => {
//     const fetchSubscriberDetails = async () => {
//       try {
//         const response = await ApiClient.get(`/admin/package/subscribers/${id}`);
//         const data = response.data;

//         setSubscriberInfo({
//           user_name: data?.data?.user_name || "N/A",
//           phone: data?.data?.phone || "N/A",
//           email: data?.data?.email || "N/A",
//           designation: data?.data?.designation || "N/A",
//           organizationName: data?.data?.organization_name || "N/A",
//           address: data?.data?.address || "N/A",
//           city: data?.data?.city || "N/A",
//         });

//         setPackageInfo({
//           packageId: data?.data?.package_id || "N/A",
//           packageName: data?.data?.package_name || "N/A",
//           packageDuration: data?.data?.package_duration || "N/A",
//           packageAmount: data?.data?.pay_amount || "N/A",
//           packageStartTime: data?.data?.package_start_date || "N/A",
//           packageEndTime: data?.data?.package_expired_date || "N/A",
//         });

//         setPaymentDetails({
//           orderId: data?.data?.order_id || "N/A",
//           transactionId: data?.data?.tran_id || "N/A",
//           account: data?.data?.acc_number || "N/A",
//           customerPhoneNumber: data?.data?.cus_phone_no || "N/A",
//           initiateAt: data?.data?.initiate_at || "N/A",
//           paymentStatus: data?.data?.payment_status || "N/A",
//           spOrderId: data?.data?.sp_order_id || "N/A",
//           storeId: data?.data?.store_id || "N/A",
//           invoiceNo: data?.data?.invoice_no || "N/A",
//           paymentMethod: data?.data?.method || "N/A",
//           paymentTimeStatus: data?.data?.payment_time || "N/A",
//           status: data?.data?.status || "N/A",
//           receivedAmount: data?.data?.recived_amount || "N/A",
//           cardHolderName: data?.data?.card_holder_name || "N/A",
//           usdRate: data?.data?.usd_rate || "N/A",
//           bankStatus: data?.data?.bank_status || "N/A",
//           usdAmount: data?.data?.usd_amount || "N/A",
//           discount: data?.data?.discount_amount || "N/A",
//         });

//         // console.log(data); // Logs full data for debugging
//       } catch (error) {
//         // console.error("Error fetching subscriber details:", error);
//       }
//     };

//     if (id) {
//       fetchSubscriberDetails(); // Only fetch data if ID is available
//     }
//   }, [id]); // Add ID as a dependency to re-fetch when it changes

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">
//       {/* Profile Component */}
//       <Profile />

      


//       {/* Subscriber Information */}
//       <div className="flex w-full gap-5">
//         <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
//           <h3 className="text-xl font-semibold mb-4 text-center">Subscriber Information</h3>
//           <div className="space-y-4">
//             {Object.entries(subscriberInfo).map(([key, value]) => (
//               <div key={key} className="flex items-center space-x-2">
//                 <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
//                 <p>{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Package Information */}
//         <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
//           <h3 className="text-xl font-semibold mb-4 text-center">Package Information</h3>
//           <div className="space-y-4">
//             {Object.entries(packageInfo).map(([key, value]) => (
//               <div key={key} className="flex items-center space-x-2">
//                 <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
//                 <p>{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Payment Transaction Details */}
//       <h2 className="text-xl font-bold mb-4 text-center">Payment Transaction Details</h2>
     
//        <div className="flex w-full gap-6">
 
//   {[paymentDetails].map((section, cardIndex) => (
//     <React.Fragment key={cardIndex}>
//       {/* প্রথম কার্ড */}
//       <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
//         <div className="space-y-4">
//           {Object.entries(section)
//             .slice(0, 9) 
//             .map(([key, value], index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
//                 <p>{value || "N/A"}</p>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* দ্বিতীয় কার্ড */}
//       <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
//         <div className="space-y-4">
//           {Object.entries(section)
//             .slice(9, 18) 
//             .map(([key, value], index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <p className="font-medium capitalize">{key.replace(/_/g, " ")}:</p>
//                 <p>{value || "N/A"}</p>
//               </div>
//             ))}
//         </div>
//       </div>
//     </React.Fragment>
//   ))}
// </div>



//     </div>
//   );
// };

// export default SubscriberDetails;



// ------------1St Design Not Api-----------
// const SubscriberDetails = () => {
 
//   const subscriberInfo = {
//     name: "Iqbal",
//     phone: "8801777044834",
//     email: "iqbal@gmail.com",
//     designation: "Staff",
//     organizationName: "Fleek",
//     address: "Majkhane",
//     city: "Dhaka",
//   };

//   const packageInfo = {
//     packageId: "PKG-12345",
//     packageName: "Premium Plan",
//     packageDuration: "6 Months",
//     packageAmount: "$120",
//     packageStartTime: "2024-01-01",
//     packageEndTime: "2024-06-30",
//   };

//   const paymentDetails = {
//     orderId: "ORD-98765",
//     transactionId: "TXN-123456789",
//     account: "9876543210",
//     customerPhoneNumber: "8801777044834",
//     initiateAt: "2024-01-15 10:30 AM",
//     paymentStatus: "Successful",
//     spOrderId: "SP-2024-001",
//     storeId: "STR-56789",
//     invoiceNo: "INV-2024-9999",
//     paymentMethod: "Credit Card",
//     paymentTimeStatus: "Completed",
//     Status: "Active",
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">
//       {/* First Card */}
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 flex">
//         {/* Subscriber Information */}
//         <div className="w-1/2 pr-4 border-r border-gray-300">
//           <h2 className="text-xl font-bold mb-4">Subscriber Information</h2>
//           <div className="space-y-4">
//             {Object.entries(subscriberInfo).map(([key, value]) => (
//               <div className="flex items-center space-x-2" key={key}>
//                 <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
//                 <p>{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Package Information */}
//         <div className="w-1/2 pl-4">
//           <h2 className="text-xl font-bold mb-4">Package Information</h2>
//           <div className="space-y-4">
//             {Object.entries(packageInfo).map(([key, value]) => (
//               <div className="flex items-center space-x-2" key={key}>
//                 <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
//                 <p>{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Second Card */}
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
//         {/* Heading */}
//         <h2 className="text-xl font-bold mb-4 text-center">Payment Transaction Details</h2>

//         {/* Content in rows */}
//         <div className="flex">
//           {/* Payment Details */}
//           <div className="w-full">
//             <div className="space-y-4">
//               {Object.entries(paymentDetails).map(([key, value]) => (
//                 <div className="flex items-center space-x-2" key={key}>
//                   <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").replace(/-/g, " ")}:</p>
//                   <p>{value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriberDetails;
// ------------1St Design Not Api-----------


