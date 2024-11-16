import { useState, useEffect } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import ApiClient from './../../../Api/ApiClient';
import axios from 'axios';

function DesignationTypeModal({
  isOpen,
  onClose,
  title,
  currentStatus,
  onStatusChange,
}) {
  if (!isOpen) return null;

  const handleRadioChange = e => {
    onStatusChange(e.target.value);
  };

  c;

  // Handle form submission
  const handleCategoryChange = async e => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Submitting data:', 'jjjj');

    try {
      // Sending POST request to the server
      const response = await axios.post('/admin/tender-config/category'); // Replace with your API endpoint
      console.log('Category submitted successfully:', response.data);
      // Handle success (e.g., clear form, show success message)
      // setFormData({ name: "" });
    } catch (error) {
      console.error(
        'Error submitting category:',
        error.response || error.message
      );
    }
  };

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
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* <div className="flex justify-center mt-4">
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
          </div> */}

          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full"
          >
            <SendOutlined onSubmit={handleCategoryChange} className="mr-2" />{' '}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Designation Type');
  const [currentStatus, setCurrentStatus] = useState('Available');
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [tenderCategories, setTenderCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/category');
        setTenderCategories(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategories();
  }, []);

  const openModal = (title, amenity) => {
    setModalTitle(title);
    setEditingAmenity(amenity);
    setCurrentStatus(amenity ? amenity.status : 'Available');
    setIsModalOpen(true);
  };

  const handleStatusChange = newStatus => {
    setCurrentStatus(newStatus);
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Category</h2>

      <button
        onClick={() => openModal('Add Designation Type')}
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
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
                Name
              </th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
                Status
              </th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tenderCategories.map((category, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{category.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      category.status === 'Available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {category.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openModal(`Edit ${category.name}`, category)}
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

export default Category;
