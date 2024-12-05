
import { useEffect, useState } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
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
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/district');
        if (response.data.success) {
          const filteredCategories = response.data.data.filter(
            category => category.status === 1
          );
          setCategories(filteredCategories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name || !selectedCategory) {
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
      district_id: selectedCategory,
    };

    try {
      const response = await ApiClient.post(
        '/admin/tender-config/upazila',
        data
      );
      // const result = await response.text();
      console.log(response.data);
      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Upazila created successfully!',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'w-72 h-auto p-3',
            title: 'text-lg',
            content: 'text-xs',
            confirmButton: 'bg-blue-500 text-white px-4 py-1 text-sm rounded-md',
          },
        });
        setName('');
        setSelectedCategory('');
        onClose();
      } else {
        Swal.fire({
          title: 'Failed!',
          text: 'Upazila creation failed!',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'w-72 h-auto p-3',
            title: 'text-lg',
            content: 'text-xs',
            confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Failed!',
        text: 'An error occurred. Please try again.',
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
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Upazila Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Upazila Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> District Name:
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="" disabled>Select a District</option>
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

function Upazila() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Designation Type');
  const [currentStatus, setCurrentStatus] = useState('Available');
  const [Upazila, setUpazila] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (title, Upazila) => {
    setModalTitle(title);
    setCurrentStatus(Upazila ? Upazila.status : 'Available');
    setIsModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchUpazilaData = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/upazila');
        setUpazila(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
        // Reload after 1 seconds
        // const interval = setInterval(() => {
        //   fetchUpazilaData();
        // }, 1000);
  
        // return () => clearInterval(interval);
    };

    fetchUpazilaData();
  }, []);

  const filteredUpazilas = Upazila.filter(amenity => 
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upazila</h2>

      {/* Create button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => openModal('Add Upazila')}
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
            placeholder="Search Upazilas"
            className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
            <SearchOutlined />
          </button>
        </div>
      </div>

      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        currentStatus={currentStatus}
      />

      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUpazilas.map((Upazila, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{Upazila.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      Upazila.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {Upazila.status === 1 ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openModal(`Edit ${Upazila.name}`, Upazila)}
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

export default Upazila;





// import { useEffect, useState } from 'react';
// import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
// import ApiClient from '../../../Api/ApiClient'; // Import ApiClient
// import Swal from 'sweetalert2';

// function DesignationTypeModal({
//   isOpen,
//   onClose,
//   title,
//   currentStatus,
//   onStatusChange,
// }) {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await ApiClient.get('admin/tender-config/district');
//         if (response.data.success) {
//           const filteredCategories = response.data.data.filter(
//             category => category.status === 1
//           );
//           setCategories(filteredCategories);
//         }
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (!name || !selectedCategory) {
//       Swal.fire({
//         title: 'Validation Error',
//         text: 'Please fill in all required fields.',
//         confirmButtonText: 'Okay',
//         customClass: {
//           popup: 'w-72 h-auto p-3',
//           title: 'text-lg',
//           content: 'text-xs',
//           confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
//         },
//       });
//       return;
//     }

//     const data = {
//       name,
//       district_id: selectedCategory,
//     };

//     try {
//       const response = await ApiClient.post('admin/tender-config/upazila', data);
//       if (response.status === 201) {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Upazila created successfully!',
//           confirmButtonText: 'Okay',
//           customClass: {
//             popup: 'w-72 h-auto p-3',
//             title: 'text-lg',
//             content: 'text-xs',
//             confirmButton: 'bg-blue-500 text-white px-4 py-1 text-sm rounded-md',
//           },
//         });
//         setName('');
//         setSelectedCategory('');
//         onClose();
//       } else {
//         Swal.fire({
//           title: 'Failed!',
//           text: 'Upazila creation failed!',
//           confirmButtonText: 'Okay',
//           customClass: {
//             popup: 'w-72 h-auto p-3',
//             title: 'text-lg',
//             content: 'text-xs',
//             confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
//           },
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Failed!',
//         text: 'An error occurred. Please try again.',
//         confirmButtonText: 'Okay',
//         customClass: {
//           popup: 'w-72 h-auto p-3',
//           title: 'text-lg',
//           content: 'text-xs',
//           confirmButton: 'bg-teal-500 text-white px-4 py-1 text-sm rounded-md',
//         },
//       });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         >
//           <CloseOutlined />
//         </button>
//         <h2 className="text-xl font-semibold mb-6">{title}</h2>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> Upazila Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               placeholder="Enter Upazila Name"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               <span className="text-red-500">*</span> District Name:
//             </label>
//             <select
//               value={selectedCategory}
//               onChange={e => setSelectedCategory(e.target.value)}
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
//             >
//               <option value="" disabled>Select a District</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
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

// function Upazila() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('Add Designation Type');
//   const [currentStatus, setCurrentStatus] = useState('Available');
//   const [upazila, setUpazila] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const openModal = (title, Upazila) => {
//     setModalTitle(title);
//     setCurrentStatus(Upazila ? Upazila.status : 'Available');
//     setIsModalOpen(true);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   useEffect(() => {
//     const fetchUpazilaData = async () => {
//       try {
//         const response = await ApiClient.get('admin/tender-config/upazila');
//         setUpazila(response.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUpazilaData();
//   }, []);

//   const filteredUpazilas = upazila.filter(amenity =>
//     amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upazila</h2>

//       {/* Create button */}
//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => openModal('Add Upazila')}
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
//             placeholder="Search Upazilas"
//             className="px-4 py-2 border border-gray-300 rounded-lg"
//           />
//           <SearchOutlined className="ml-2 text-xl text-gray-500" />
//         </div>
//       </div>

//       {/* Table */}
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="border-b">
//             <th className="px-6 py-3 text-left">Upazila Name</th>
//             <th className="px-6 py-3 text-left">District Name</th>
//             <th className="px-6 py-3 text-left">Status</th>
//             <th className="px-6 py-3 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUpazilas.map(upazila => (
//             <tr key={upazila.id}>
//               <td className="px-6 py-4">{upazila.name}</td>
//               <td className="px-6 py-4">{upazila.district.name}</td>
//               <td className="px-6 py-4">{upazila.status === 1 ? 'Active' : 'Inactive'}</td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => openModal('Edit Upazila', upazila)}
//                   className="text-teal-500 hover:text-teal-700"
//                 >
//                   <EditOutlined />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <DesignationTypeModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//         currentStatus={currentStatus}
//         onStatusChange={setCurrentStatus}
//       />
//     </div>
//   );
// }

// export default Upazila;
