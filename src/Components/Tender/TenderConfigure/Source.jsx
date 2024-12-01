
import React, { useEffect, useState } from 'react';
import { SendOutlined, CloseOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import ApiClient from '../../../Api/ApiClient';  // Ensure ApiClient is properly configured

// Dropdown component for selecting the source type
const Dropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-sm"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Modal component for adding or editing a source
const DesignationTypeModal = ({
  isOpen,
  onClose,
  title,
  updateSource,
  sourceData,
}) => {
  const [name, setName] = useState(sourceData?.name || '');
  const [sourceType, setSourceType] = useState(sourceData?.type || '');

  const sourceTypeOptions = [
    { value: 'e-GP', label: 'e-GP' },
    { value: 'Newspaper', label: 'Newspaper' },
    { value: 'Online', label: 'Online' },
    { value: 'Advertisement', label: 'Advertisement' },
    { value: 'Website', label: 'Website' },
    { value: 'Manual', label: 'Manual' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        type: sourceType,
        details: `Collected from ${sourceType} on ${new Date().toLocaleDateString()}`,
      };

      if (sourceData) {
        // Edit existing source
        await ApiClient.patch(`/admin/tender-config/source/${sourceData.id}`, payload);
      } else {
        // Create new source
        await ApiClient.post('/admin/tender-config/source', payload);
      }

      updateSource(payload);  // Refresh the data after saving
      onClose();
      Swal.fire('Success', 'Source has been saved!', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className={`fixed inset-0 ${!isOpen && 'hidden'} bg-gray-800 bg-opacity-50 flex justify-center items-center z-50`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          <CloseOutlined />
        </button>
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Source Type:
            </label>
            <Dropdown
              options={sourceTypeOptions}
              value={sourceType}
              onChange={setSourceType}
              placeholder="Select Source Type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Source Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter source name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>
          <button type="submit" className="bg-teal-500 text-white px-6 py-3 rounded-lg w-full">
            <SendOutlined className="mr-2" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
};

// Source List Management Component
const Source = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Source');
  const [currentSourceData, setCurrentSourceData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.get('/admin/tender-config/source');
      setData(response.data.data || []);
      setLoading(false);
    } catch (err) {
      Swal.fire('Error', err.message || 'Unable to fetch data', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (sourceData) => {
    setCurrentSourceData(sourceData);
    setModalTitle('Edit Source');
    setIsModalOpen(true);
  };

  const updateSource = async (newData) => {
    // Refresh the list after source is created or edited
    await fetchData();
  };

  const totalPages = Math.ceil(filteredData.length / 10);
  const paginatedData = filteredData.slice((currentPage - 1) * 10, currentPage * 10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Source</h2>

      <div className="flex justify-between items-center mb-4 w-full">
        <button
          onClick={() => {
            setCurrentSourceData(null);
            setModalTitle('Add Source');
            setIsModalOpen(true);
          }}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg"
        >
          Create
        </button>

        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sources"
            className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
            <SearchOutlined />
          </button>
        </div>
      </div>

      {/* Modal for creating or editing source */}
      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        sourceData={currentSourceData}
        updateSource={updateSource}
      />

      {/* Table displaying the sources */}
      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">ID</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Name</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Type</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Details</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Status</th>
              <th className="px-4 py-2 bg-teal-100 text-left font-semibold border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3">{item.details}</td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button onClick={() => handleEditClick(item)} className="text-teal-500">
                    <EditOutlined /> Edit
                  </button>
                  {/* Add additional actions like Delete here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center ">
          {/* <div>
Page {currentPage} of {totalPages}
</div> */}
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${page === currentPage ? 'bg-teal-500 text-white' : 'bg-white border'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Source;

