
// import { useEffect, useState } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
// import ApiClient from './../../../Api/ApiClient';

// // Modal component for adding/editing designation types with larger size
// function DesignationTypeModal({ isOpen, onClose, title, currentStatus, onStatusChange }) {
//   if (!isOpen) return null;

//   // Handle radio button change
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
//               placeholder="Enter Your Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>

//           {/* Center the radio buttons */}
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

// Main SubSector component

import { useEffect, useState } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import ApiClient from './../../../Api/ApiClient';
import Swal from 'sweetalert2';
function DesignationTypeModal({
  isOpen,
  onClose,
  title,
  currentStatus,
  onStatusChange,
}) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(''); // State for sector name
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  useEffect(() => {
    // Fetch categories from the API
    const fetchSubCategories = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/sector');
        console.log(response);
        if (response.data.success) {
          const filteredCategories = response.data.data.filter(
            category => category.sector_status === 1
          );
          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name || !selectedSubCategory) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
        confirmButtonText: 'Okay',
        customClass: {
          popup: 'w-72 h-auto p-3',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
        },
      });
      return;
    }

    const data = {
      name,
      sector_id: selectedSubCategory,
    };
    console.log('beforeSendData:', data);
    try {
      const token = 'your-jwt-token-here'; // Replace with your actual token
      const response = await ApiClient.post(
        '/admin/tender-config/sub-sector',
        data
      );
      console.log(response);

      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Sub sector created successfully!.',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'w-72 h-auto p-3',
            title: 'text-lg',
            content: 'text-xs',
            confirmButton:
              'bg-blue-500 text-white px-4 py-1 text-sm rounded-md',
          },
        });
        setName('');
        setSelectedSubCategory('');
        onClose();
      } else {
        Swal.fire({
          title: 'Failed!',
          text: 'Sector created Faild!.',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'w-72 h-auto p-3',
            title: 'text-lg',
            content: 'text-xs',
            confirmButton:
              'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
          },
        });
      }
    } catch (error) {
      console.error('Failed to submit sector:', error);
      const errorMessages = Object.values(error.response?.data?.message || {})
        .flat()
        .join('\n');

      Swal.fire({
        title: 'Failed!',
        // text: errorMessages || 'An error occurred. Please try again.',
        text: 'Sector name already exists',
        confirmButtonText: 'Okay',
        customClass: {
          popup: 'w-72 h-auto p-3',
          title: 'text-lg',
          content: 'text-xs',
          confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <CloseOutlined />
        </button>
        <h2 className="text-xl font-semibold mb-6">Create Sector Type</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Sub sector Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Sub category Name:
            </label>
            <select
              value={selectedSubCategory}
              onChange={e => setSelectedSubCategory(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="" disabled>
                Select a sub category
              </option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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

function SubSector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Designation Type");
  const [currentStatus, setCurrentStatus] = useState("Available");
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [subSector, setSubSector] = useState([]); // Initialize as an empty array

  // Open modal for adding or editing amenities
  const openModal = (title, amenity) => {
    setModalTitle(title);
    setEditingAmenity(amenity);
    setCurrentStatus(amenity ? amenity.status : "Available"); // Set the current status to match the selected amenity
    setIsModalOpen(true);
  };

  // Handle status change inside the modal
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
  };

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchSubSectorData = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/sub-sector');
        setSubSector(response.data.data);  // Update state with the fetched sector data
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSubSectorData();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">SubSector</h2>

      <button
        onClick={() => openModal("Add Designation Type")}
        className="bg-teal-500 text-white px-7 py-3 rounded-lg self-start"
      >
        Create
      </button>

      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />

      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {subSector && subSector.map((amenity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{amenity.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${amenity.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {amenity.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openModal(`Edit ${amenity.name}`, amenity)}
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    <EditOutlined className="mr-1" /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubSector;
