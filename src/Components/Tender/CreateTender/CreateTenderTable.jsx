
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import { AiOutlineFile, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import ApiClient from './../../../Api/ApiClient';
const CreateTenderTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewTenderDetails, setViewTenderDetails] = useState(null);
  const [editTender, setEditTender] = useState(null);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredAdminList = adminUserList.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAdminList = filteredAdminList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleViewTender = admin => {
    setViewTenderDetails(admin);
  };

  const handleEditTender = () => {
    setEditTender(viewTenderDetails);
    setViewTenderDetails(null); // Hide view form
  };

  const [selectedFile, setSelectedFile] = useState(null);
  // Handle file selection
  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file); // Update state with the selected file
  };
  // Simulate file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      alert(`File "${selectedFile.name}" has been uploaded!`);
      setSelectedFile(null); // Clear the selected file after upload
    } else {
      alert('Please select a file to upload.');
    }
  };

  const data = [
    { label: 'Name', value: 'Imran' },
    { label: 'Earnest Money', value: '' },
    { label: 'Document Price', value: '' },
    { label: 'Published On', value: '' },
    { label: 'Opening Date', value: '' },
    { label: 'End Date', value: '' },
    { label: 'Purchase Last Date', value: '' },
    { label: 'Prebid Meeting Date', value: '' },
    { label: 'Submission Date', value: '' },
    { label: 'Tender Section', value: '' },
    { label: 'Type', value: '' },
    { label: 'Source Type', value: '' },
    { label: 'Status', value: '' },
    { label: 'Category Name', value: '' },
    { label: 'Sector Name', value: '' },
    { label: 'SubSector Name', value: '' },
    { label: 'Department Name', value: '' },
    { label: 'Sub Department Name', value: '' },
    { label: 'Division Name', value: '' },
    { label: 'District Name', value: '' },
    { label: 'Upazila Name', value: '' },
    { label: 'Source Name', value: '' },
    { label: 'Created At', value: '' },
  ];

  return (
    <div className="p-6 bg-gray-100">
      {!showCreateForm && !viewTenderDetails && !editTender && (
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-teal-500 text-white px-7 py-3 rounded-lg flex items-center"
          >
            <AiOutlinePlus className="mr-2" />
            Create
          </button>
          <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
            <SearchOutlined className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Tender Name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full text-sm outline-none"
            />
          </div>
        </div>
      )}

      {showCreateForm ? (
        <CreateTenderForm onClose={() => setShowCreateForm(false)} />
      ) : viewTenderDetails ? (
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-teal-600">
                Single Tender View
              </h1>
              <div className="flex space-x-4">
                {/* Close Button */}
                <button
                  onClick={() => setViewTenderDetails(null)}
                  className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Close
                </button>
                {/* Edit Button */}
                {/* <button
        onClick={handleEditTender}
        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Edit Tender
      </button> */}
                {/* Update Button */}
                <button className="flex items-center px-6 py-2 bg-teal-500 text-white font-medium rounded-md shadow hover:bg-teal-600">
                  <span className="mr-2">✏️</span> Update
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-3 gap-6 p-6">
              {/* Details Section */}
              <div className="col-span-2">
                {/* <table className="table-auto w-full text-left text-sm border-separate border-spacing-y-2">
        <tbody>
          {[
            { label: "Name", value: "Imran" },
            { label: "Earnest Money", value: "" },
            { label: "Document Price", value: "" },
            { label: "Published On", value: "" },
            { label: "Opening Date", value: "" },
            { label: "End Date", value: "" },
            { label: "Purchase Last Date", value: "" },
            { label: "Prebid Meeting Date", value: "" },
            { label: "Submission Date", value: "" },
            { label: "Tender Section", value: "" },
            { label: "Type", value: "" },
            { label: "Source Type", value: "" },
            { label: "Status", value: "" },
            { label: "Category Name", value: "" },
            { label: "Sector Name", value: "" },
            { label: "SubSector Name", value: "" },
            { label: "Department Name", value: "" },
            { label: "Sub Department Name", value: "" },
            { label: "Division Name", value: "" },
            { label: "District Name", value: "" },
            { label: "Upazila Name", value: "" },
            { label: "Source Name", value: "" },
            { label: "Created At", value: "" },
          ].map((item, index) => (
            <tr key={index}>
              <td className="font-medium text-gray-700 py-2">{item.label}</td>
              <td className="py-2 text-gray-600">{item.value || "---"}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
                <div className="p-4">
                  <table className="table-auto w-full text-left text-sm border-separate border-spacing-y-2">
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td className="font-medium text-gray-700 py-2">
                            {item.label}
                          </td>
                          <td className="py-2 text-gray-600">
                            {item.value || '---'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Image and Actions Section */}
              <div className="col-span-1 flex flex-col items-center">
                {/* Image Display */}
                <div className="relative w-full h-48 mb-4">
                  <img
                    src="https://via.placeholder.com/300"
                    alt="Room"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <span className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    142
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b text-center">ID</th>
                  <th className="p-3 border-b text-center">Name</th>
                  <th className="p-3 border-b text-center">Type</th>
                  <th className="p-3 border-b text-center">Status</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAdminList.map(admin => (
                  <tr key={admin.id} className="text-center">
                    <td className="p-3 border-b">{admin.id}</td>
                    <td className="p-3 border-b">{admin.name}</td>
                    <td className="p-3 border-b">{admin.email}</td>
                    <td className="p-3 border-b">{admin.status}</td>
                    <td className="p-3 border-b">
                      <button
                        className="text-blue-600"
                        onClick={() => handleViewTender(admin)}
                      >
                        <AiOutlineEye className="text-gray-600" size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination
              current={currentPage}
              total={filteredAdminList.length}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTenderTable;
