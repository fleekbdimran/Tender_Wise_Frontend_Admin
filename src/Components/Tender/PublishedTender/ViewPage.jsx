



// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// const ViewPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     designation: "",
//     institute: "",
//     tenderName: "",
//     tenderFile: null,
//   });

//   const navigate = useNavigate(); // Initialize navigate

//   // Handle input change for the form fields
//   const handleChange = (e) => {
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

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     // Add your form submission logic here (e.g., API call)
//   };

//   // Close the form and navigate back
//   const handleClose = () => {
//     navigate(-1); // Navigate back to the previous page
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
//         {/* Left Section */}
//         <div className="p-6 flex flex-col items-center justify-center w-full md:w-1/2">
//           <img
//             src="/src/image/image 18.png"
//             alt="Logo"
//             className="h-52 md:h-48 object-contain"
//           />
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
//         <div className="p-6 w-full md:w-1/2 border border-gray-200 rounded-md shadow-lg relative">
//           {/* Close Icon */}
//           <button
//             onClick={handleClose} // Close the form and navigate back
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>

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
//                 <label
//                   htmlFor={field.id}
//                   className="block text-sm font-medium text-gray-700"
//                 >
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

// export default ViewPage;



import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const ViewPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
    institute: "",
    tenderName: "",
    tenderFile: null,
  });

  const navigate = useNavigate(); // Initialize navigate

  // Handle input change for the form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "tenderFile" && files) {
      const file = files[0];
      if (file && file.type !== "application/pdf") {
        alert("Please upload a valid PDF file.");
        return;
      }
      setFormData({
        ...formData,
        tenderFile: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your form submission logic here (e.g., API call)
  };

  // Close the form and navigate back
  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
        
        {/* Left Section */}
        <div className="p-6 flex flex-col items-center justify-center w-full md:w-1/2 relative">
        
          {/* Close Icon */}
          <button
            onClick={handleClose} // Close the form and navigate back
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <img
            src="/src/image/image 18.png"
            alt="Logo"
            className="h-52 md:h-48 object-contain mt-10" // Adjust top margin to create space for the icon
          />
          <div className="text-center mt-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-4 text-[25px] md:text-[30px]">
              Post your tender in
              <div className="text-yellow-500 text-xl mt-2 text-[25px] md:text-[30px]">
                TenderWise
              </div>
            </h1>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              See details →
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-6 w-full md:w-1/2 border border-gray-200 rounded-md shadow-lg relative">
          <p className="text-gray-600 mb-7 text-center">
            Post RFQs, private tenders, and auction notices here to drive competitive pricing and quality.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[ 
              { label: "Name", id: "name", type: "text", placeholder: "Enter your name", required: true },
              { label: "Phone Number", id: "phone", type: "tel", placeholder: "Enter your phone number", required: true },
              { label: "Email", id: "email", type: "email", placeholder: "Enter your email", required: true },
              { label: "Designation", id: "designation", type: "text", placeholder: "Enter your designation" },
              { label: "Institute", id: "institute", type: "text", placeholder: "Enter your institute" },
              { label: "Tender's Name", id: "tenderName", type: "text", placeholder: "Enter tender's name", required: true },
              { label: "Tender's File (PDF only)", id: "tenderFile", type: "file", required: true }
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  required={field.required || false}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                />
              </div>
            ))}

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 transition"
              >
                Post Tender
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
