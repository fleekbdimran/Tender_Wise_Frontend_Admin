
// import  { useState } from "react";

// const PostTender = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     designation: "",
//     institute: "",
//     tenderName: "",
//     tenderFile: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//     alert("Tender submitted successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl">
//         {/* Left Section */}
//         <div className="bg-blue-100 p-6 flex items-center justify-center w-full md:w-1/2">
//         <img
//                   src="../../../image/Frame 133886.png"
//                   alt="Tender Icon"
//                   className="w-44 h-22"
//                 />
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-blue-600 mb-4">
//               Post your tender in <span className="text-yellow-500">TenderWise</span>
//             </h1>
          
//             <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
//               See details →
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="p-6 w-full md:w-1/2">
//         <p className="text-gray-600 mb-7">
//               Post RFQs, private tenders, and auction notices here to drive competitive pricing and quality.
//             </p>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="name">
//                 Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
//                 Phone Number
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
//                 placeholder="Enter your phone number"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="designation">
//                 Designation
//               </label>
//               <input
//                 id="designation"
//                 name="designation"
//                 type="text"
//                 value={formData.designation}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
//                 placeholder="Enter your designation"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="institute">
//                 Institute
//               </label>
//               <input
//                 id="institute"
//                 name="institute"
//                 type="text"
//                 value={formData.institute}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
//                 placeholder="Enter your institute"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="tenderName">
//                 Tender's Name
//               </label>
//               <input
//                 id="tenderName"
//                 name="tenderName"
//                 type="text"
//                 value={formData.tenderName}
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
//                 placeholder="Enter tender's name"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700" htmlFor="tenderFile">
//                 Tender's File
//               </label>
//               <input
//                 id="tenderFile"
//                 name="tenderFile"
//                 type="file"
//                 onChange={handleChange}
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 transition"
//             >
//               Post Tender
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostTender;



import { useState } from "react";

const PostTender = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
    institute: "",
    tenderName: "",
    tenderFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Tender submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl">
        {/* Left Section */}
        <div className=" p-6 flex flex-col items-center justify-center w-full md:w-1/2">
      
          <img src="/src/image/image 18.png" alt="Logo" className="" style={{ height: 212, width:352 }} />
          <div className="text-center">
      

<h1 className="text-2xl font-bold text-blue-600 mb-4 br text-[30px]">
  Post your tender in
  <div className="text-yellow-500 text-xl mt-2 text-[30px]">TenderWise</div>
</h1>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              See details →
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-6 w-full md:w-1/2">
          <p className="text-gray-600 mb-7">
            Post RFQs, private tenders, and auction notices here to drive
            competitive pricing and quality.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="designation">
                Designation
              </label>
              <input
                id="designation"
                name="designation"
                type="text"
                value={formData.designation}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                placeholder="Enter your designation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="institute">
                Institute
              </label>
              <input
                id="institute"
                name="institute"
                type="text"
                value={formData.institute}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                placeholder="Enter your institute"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="tenderName">
                Tender's Name
              </label>
              <input
                id="tenderName"
                name="tenderName"
                type="text"
                value={formData.tenderName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                placeholder="Enter tender's name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="tenderFile">
                Tender's File
              </label>
              <input
                id="tenderFile"
                name="tenderFile"
                type="file"
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 transition"
            >
              Post Tender
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTender;
