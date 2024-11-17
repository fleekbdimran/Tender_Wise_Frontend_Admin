// import { useState, useEffect } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';

// function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange }) {
//   if (!isOpen) return null;

//   const handleRadioChange = (e) => {
//     onStatusChange(e.target.value);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Name:
//             </label>
//             <input
//               type="text"
//               placeholder="Enter SubDepartment Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>

//           <div className="flex justify-center mt-4">
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="Available"
//                 checked={currentStatus === 'Available'}
//                 onChange={handleRadioChange}
//                 className="mr-2"
//               />
//               Available
//             </label>
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="Unavailable"
//                 checked={currentStatus === 'Unavailable'}
//                 onChange={handleRadioChange}
//                 className="mr-2"
//               />
//               Unavailable
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
//           >
//             <SendOutlined className="mr-2" /> Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function SubDepartment() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add SubDepartment');
//   const [currentStatus, setCurrentStatus] = useState('Available');
//   const [editingAmenity, setEditingAmenity] = useState(null);
//   const [subDepartments, setSubDepartments] = useState([]);

//   // Fetch SubDepartment data from the API
//   useEffect(() => {
//     const fetchSubDepartments = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/sub-department');
//         setSubDepartments(response.data.data); // Update the state with fetched subdepartment data
//         console.log(response.data); // Log the response to debug
//       } catch (error) {
//         console.error('Error fetching SubDepartments:', error);
//       }
//     };

//     fetchSubDepartments();
//   }, []);

//   // Open the modal for adding or editing a SubDepartment
//   const openModal = (title, subDepartment) => {
//     setModalTitle(title);
//     setEditingAmenity(subDepartment);
//     setCurrentStatus(subDepartment ? subDepartment.status : 'Available'); // Set current status based on subDepartment
//     setIsModalOpen(true);
//   };

//   // Handle the status change from modal
//   const handleStatusChange = (newStatus) => {
//     setCurrentStatus(newStatus);
//   };

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">SubDepartment</h2>

//       {/* Button to create new SubDepartment */}
//       <button onClick={() => openModal('Add SubDepartment')} className="bg-teal-500 text-white px-7 py-3 rounded-lg self-start">
//         Create
//       </button>

//       {/* Modal for adding or editing SubDepartment */}
//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
//         onStatusChange={handleStatusChange}
//       />

//       {/* Table displaying list of SubDepartments */}
//       <div className="flex-grow overflow-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subDepartments.map((subDepartment, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{subDepartment.name}</td>
//                 <td className="px-4 py-2 border-b">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${subDepartment.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
//                   >
//                     {subDepartment.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <button onClick={() => openModal(`Edit ${subDepartment.name}`, subDepartment)} className="text-blue-500 hover:underline flex items-center">
//                     <EditOutlined className="mr-1" /> Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default SubDepartment;


// import { useState, useEffect } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';

// function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange }) {
//   if (!isOpen) return null;

//   const handleRadioChange = (e) => {
//     onStatusChange(e.target.value);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Name:
//             </label>
//             <input
//               type="text"
//               placeholder="Enter SubDepartment Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>

//           <div className="flex justify-center mt-4">
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="Available"
//                 checked={currentStatus === 'Available'}
//                 onChange={handleRadioChange}
//                 className="mr-2"
//               />
//               Available
//             </label>
//             <label className="flex items-center mx-4">
//               <input
//                 type="radio"
//                 name="status"
//                 value="Unavailable"
//                 checked={currentStatus === 'Unavailable'}
//                 onChange={handleRadioChange}
//                 className="mr-2"
//               />
//               Unavailable
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
//           >
//             <SendOutlined className="mr-2" /> Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function SubDepartment() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add SubDepartment');
//   const [currentStatus, setCurrentStatus] = useState('Available');
//   const [editingAmenity, setEditingAmenity] = useState(null);
//   const [subDepartments, setSubDepartments] = useState([]);
//   const [filteredSubDepartments, setFilteredSubDepartments] = useState([]); // For filtered data
//   const [searchTerm, setSearchTerm] = useState(''); // For the search input

//   // Fetch SubDepartment data from the API
//   useEffect(() => {
//     const fetchSubDepartments = async () => {
//       try {
//         const response = await ApiClient.get('/admin/tender-config/sub-department');
//         setSubDepartments(response.data.data);
//         setFilteredSubDepartments(response.data.data); // Initialize filtered data
//       } catch (error) {
//         console.error('Error fetching SubDepartments:', error);
//       }
//     };

//     fetchSubDepartments();
//   }, []);

//   // Open the modal for adding or editing a SubDepartment
//   const openModal = (title, subDepartment) => {
//     setModalTitle(title);
//     setEditingAmenity(subDepartment);
//     setCurrentStatus(subDepartment ? subDepartment.status : 'Available');
//     setIsModalOpen(true);
//   };

//   // Handle the search input change
//   const handleSearchChange = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     setFilteredSubDepartments(
//       subDepartments.filter((sub) =>
//         sub.name.toLowerCase().includes(term)
//       )
//     );
//   };

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">SubDepartment</h2>

//       <div className="flex justify-between items-center mb-4">
//          {/* Button to create new SubDepartment */}
//          <button
//           onClick={() => openModal('Add SubDepartment')}
//           className="bg-teal-500 text-white px-7 py-3 rounded-lg"
//         >
//           Create
//         </button>
//         {/* Search Bar */}
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search sub-departments"
//             className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
//           />
//           <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
//             <SearchOutlined />
//           </button>
//         </div>

       
//       </div>

//       {/* Modal for adding or editing SubDepartment */}
//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
//         onStatusChange={setCurrentStatus}
//       />

//       {/* Table displaying list of SubDepartments */}
//       <div className="flex-grow overflow-auto">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
//               <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSubDepartments.map((subDepartment, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{subDepartment.name}</td>
//                 <td className="px-4 py-2 border-b">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${subDepartment.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
//                   >
//                     {subDepartment.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <button
//                     onClick={() => openModal(`Edit ${subDepartment.name}`, subDepartment)}
//                     className="text-blue-500 hover:underline flex items-center"
//                   >
//                     <EditOutlined className="mr-1" /> Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default SubDepartment;


import { useState, useEffect } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
import ApiClient from './../../../Api/ApiClient';

function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange, onSubmit, subDepartment }) {
  if (!isOpen) return null;

  const [name, setName] = useState(subDepartment ? subDepartment.name : '');
  
  const handleRadioChange = (e) => {
    onStatusChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, status: currentStatus });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <CloseOutlined />
        </button>
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter SubDepartment Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="flex justify-center mt-4">
            <label className="flex items-center mx-4">
              <input
                type="radio"
                name="status"
                value="Available"
                checked={currentStatus === 'Available'}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Available
            </label>
            <label className="flex items-center mx-4">
              <input
                type="radio"
                name="status"
                value="Unavailable"
                checked={currentStatus === 'Unavailable'}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Unavailable
            </label>
          </div>

          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
          >
            <SendOutlined className="mr-2" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function SubDepartment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add SubDepartment');
  const [currentStatus, setCurrentStatus] = useState('Available');
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [subDepartments, setSubDepartments] = useState([]);
  const [filteredSubDepartments, setFilteredSubDepartments] = useState([]); // For filtered data
  const [searchTerm, setSearchTerm] = useState(''); // For the search input
  const [loading, setLoading] = useState(false); // For loading state

  // Fetch SubDepartment data from the API
  useEffect(() => {
    const fetchSubDepartments = async () => {
      try {
        setLoading(true);
        const response = await ApiClient.get('/admin/tender-config/sub-department');
        setSubDepartments(response.data.data);
        setFilteredSubDepartments(response.data.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching SubDepartments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubDepartments();
  }, []);

  // Open the modal for adding or editing a SubDepartment
  const openModal = (title, subDepartment) => {
    setModalTitle(title);
    setEditingAmenity(subDepartment);
    setCurrentStatus(subDepartment ? subDepartment.status : 'Available');
    setIsModalOpen(true);
  };

  // Handle the search input change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredSubDepartments(
      subDepartments.filter((sub) =>
        sub.name.toLowerCase().includes(term)
      )
    );
  };

  // Handle submit for adding/editing sub-department
  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      if (editingAmenity) {
        // Update existing sub-department
        await ApiClient.put(`/admin/tender-config/sub-department/${editingAmenity.id}`, data);
      } else {
        // Create new sub-department
        await ApiClient.post('/admin/tender-config/sub-department', data);
      }
      setIsModalOpen(false);
      setCurrentStatus('Available');
      setEditingAmenity(null);
      fetchSubDepartments(); // Re-fetch data after submit
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">SubDepartment</h2>

      <div className="flex justify-between items-center mb-4">
         {/* Button to create new SubDepartment */}
         <button
          onClick={() => openModal('Add SubDepartment')}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg"
        >
          Create
        </button>
        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search sub-departments"
            className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
            <SearchOutlined />
          </button>
        </div>
      </div>

      {/* Modal for adding or editing SubDepartment */}
      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        currentStatus={currentStatus}
        onStatusChange={setCurrentStatus}
        onSubmit={handleSubmit}
        subDepartment={editingAmenity}
      />

      {/* Table displaying list of SubDepartments */}
      <div className="flex-grow overflow-auto">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
                <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
                <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubDepartments.map((subDepartment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{subDepartment.name}</td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${subDepartment.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {subDepartment.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => openModal(`Edit ${subDepartment.name}`, subDepartment)}
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      <EditOutlined className="mr-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SubDepartment;








