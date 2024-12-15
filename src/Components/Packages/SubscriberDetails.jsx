


const SubscriberDetails = () => {
  const subscriberInfo = {
    name: "Iqbal",
    phone: "8801777044834",
    email: "iqbal@gmail.com",
    designation: "Staff",
    organizationName: "Fleek",
    address: "Majkhane",
    city: "Dhaka",
  };

  const packageInfo = {
    packageId: "PKG-12345",
    packageName: "Premium Plan",
    packageDuration: "6 Months",
    packageAmount: "$120",
    packageStartTime: "2024-01-01",
    packageEndTime: "2024-06-30",
  };

  const paymentDetails = {
    orderId: "ORD-98765",
    transactionId: "TXN-123456789",
    account: "9876543210",
    customerPhoneNumber: "8801777044834",
    initiateAt: "2024-01-15 10:30 AM",
    paymentStatus: "Successful",
    spOrderId: "SP-2024-001",
    storeId: "STR-56789",
    invoiceNo: "INV-2024-9999",
    paymentMethod: "Credit Card",
    paymentTimeStatus: "Completed",
    status: "Active",
    receivedAmount: "$120",
    cardHolderName: "Iqbal",
    usdRate: "1.00",
    bankStatus: "Success",
    usdAmount: "$120",
    discount: "$0",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">
      {/* Combined Heading for All Cards */}

     
       
     
     

      {/* Flexbox Container for Subscriber and Package Information */}
      <div className="flex w-full gap-5">
        {/* Subscriber Information Card */}
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Subscriber Information</h3>
          <div className="space-y-4">
            {Object.entries(subscriberInfo).map(([key, value]) => (
              <div className="flex items-center space-x-2" key={key}>
                <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Package Information Card */}
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Package Information</h3>
          <div className="space-y-4">
            {Object.entries(packageInfo).map(([key, value]) => (
              <div className="flex items-center space-x-2" key={key}>
                <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Details Cards (Side by Side, No Gap) */}
      <h2 className="text-xl font-bold mb-4 text-center">Payment Transaction Details</h2>

      <div className="flex w-full">
        {/* Payment Details Card 1 */}
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <div className="space-y-4">
            {Object.entries(paymentDetails)
              .slice(0, 9)
              .map(([key, value]) => (
                <div className="flex items-center space-x-2" key={key}>
                  <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
                  <p>{value}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Payment Details Card 2 */}
        <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
          <div className="space-y-4">
            {Object.entries(paymentDetails)
              .slice(9)
              .map(([key, value]) => (
                <div className="flex items-center space-x-2" key={key}>
                  <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
                  <p>{value}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberDetails;



// import Profile from "./Profile/Profile";

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
//     status: "Active",
//     receivedAmount: "$120",
//     cardHolderName: "Iqbal",
//     usdRate: "1.00",
//     bankStatus: "Success",
//     usdAmount: "$120",
//     discount: "$0",
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">
//       {/* Combined Heading for All Cards */}
     
//         <Profile></Profile>
//       {/* Flexbox Container for Subscriber and Package Information */}
//       <div className="flex w-full gap-5">
//         {/* Subscriber Information Card */}
//         <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
//           <h3 className="text-xl font-semibold mb-4 text-center">Subscriber Information</h3>
//           <div className="space-y-4">
//             {Object.entries(subscriberInfo).map(([key, value]) => (
//               <div className="flex items-center space-x-2" key={key}>
//                 <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
//                 <p>{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Package Information Card */}
//         <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
//           <h3 className="text-xl font-semibold mb-4 text-center">Package Information</h3>
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

//       {/* Payment Details Cards (Side by Side, No Gap) */}
//       <h2 className="text-xl font-bold mb-4 text-center">Payment Transaction Details</h2>

//       <div className="flex w-full">
//         {/* Payment Details Card 1 */}
//         <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
//           <div className="space-y-4">
//             {Object.entries(paymentDetails)
//               .slice(0, 9)
//               .map(([key, value]) => (
//                 <div className="flex items-center space-x-2" key={key}>
//                   <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
//                   <p>{value}</p>
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* Payment Details Card 2 */}
//         <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
//           <div className="space-y-4">
//             {Object.entries(paymentDetails)
//               .slice(9)
//               .map(([key, value]) => (
//                 <div className="flex items-center space-x-2" key={key}>
//                   <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
//                   <p>{value}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
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


