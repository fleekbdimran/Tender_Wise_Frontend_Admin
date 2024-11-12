
import { useState } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';

// Sample data for amenities
const amenities = [

  { name: 'Stage', status: 'Available', action: 'Edit' },
  { name: 'Light', status: 'Available', action: 'Edit' },
  { name: 'Coat Check', status: 'Available', action: 'Edit' },
  { name: 'ha', status: 'Unavailable', action: 'Edit' },
];

// Modal component for adding/editing designation types
function DesignationTypeModal({ isOpen, onClose, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <CloseOutlined />
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center justify-center w-full"
          >
            <SendOutlined className="mr-2" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// Main Category component
function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Designation Type");

  const openModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => openModal("Add Designation Type")}
        className="bg-teal-500 text-white px-7 py-3 rounded-lg mb-4"
      >
        Create
      </button>

      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {amenities.map((amenity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{amenity.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${amenity.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {amenity.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  {amenity.action === 'Default' ? (
                    <span className="text-gray-600 px-2 py-1 rounded-full border border-gray-300">Default</span>
                  ) : (
                    <button
                      onClick={() => openModal(`Edit ${amenity.name}`)}
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      <EditOutlined className="mr-1" /> Edit
                    </button>
                  )}
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



