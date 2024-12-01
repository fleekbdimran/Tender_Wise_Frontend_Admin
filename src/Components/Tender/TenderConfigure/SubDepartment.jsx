
import { useEffect, useState } from 'react';
import { EditOutlined, CloseOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
import ApiClient from './../../../Api/ApiClient';
import Swal from 'sweetalert2';

// DesignationTypeModal Component
function DesignationTypeModal({
  isOpen,
  onClose,
  title,
  currentSubDepartment,
  onSubmit,
}) {
  const [name, setName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/department');
        if (response.data.success) {
          const activeDepartments = response.data.data.filter((dept) => dept.department_status === 1);
          setDepartments(activeDepartments);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (currentSubDepartment) {
      setName(currentSubDepartment.name || '');
      setSelectedDepartment(currentSubDepartment.department_id || '');
    } else {
      setName('');
      setSelectedDepartment('');
    }
  }, [currentSubDepartment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !selectedDepartment) {
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

    onSubmit({ name, department_id: selectedDepartment });
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Sub-Department Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter sub-department name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Department:
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select a Department
              </option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg flex items-center justify-center"
          >
            <SendOutlined className="mr-2" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// SubDepartment Component
function SubDepartment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentSubDepartment, setCurrentSubDepartment] = useState(null);
  const [subDepartments, setSubDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSubDepartments = async () => {
      try {
        const response = await ApiClient.get('/admin/tender-config/sub-department');
        if (response.data.success) {
          setSubDepartments(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching sub-departments:', error);
      }
    };

    fetchSubDepartments();
  }, []);

  const handleModalOpen = (title, subDepartment = null) => {
    setModalTitle(title);
    setCurrentSubDepartment(subDepartment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentSubDepartment(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      const url = currentSubDepartment
        ? `/admin/tender-config/sub-department/${currentSubDepartment.id}`
        : '/admin/tender-config/sub-department';
      const method = currentSubDepartment ? 'patch' : 'post';

      const response = await ApiClient[method](url, data);
      if (response.data.success) {
        Swal.fire('Success!', `Sub-Department ${currentSubDepartment ? 'updated' : 'created'} successfully.`, 'success');
        handleModalClose();
        // Re-fetch the list of sub-departments
        const updatedSubDepartments = await ApiClient.get('/admin/tender-config/sub-department');
        setSubDepartments(updatedSubDepartments.data.data);
      } else {
        Swal.fire('Error!', 'Failed to save changes.', 'error');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
    }
  };

  const filteredSubDepartments = subDepartments.filter((subDept) =>
    subDept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-gray-100 gap-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">SubDepartments</h2>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleModalOpen('Add SubDepartment')}
          className="bg-teal-500 text-white px-7 py-3 rounded-lg"
        >
          Create
        </button>

        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search SubDepartments"
            className="px-4 py-2 border border-gray-300 rounded-l-md w-[400px]"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md flex items-center">
            <SearchOutlined />
          </button>
        </div>
      </div>

      <DesignationTypeModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        currentSubDepartment={currentSubDepartment}
        onSubmit={handleFormSubmit}
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
            {filteredSubDepartments.map((subDept, index) => (
              <tr key={subDept.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{subDept.name}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      subDept.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {subDept.status === 1 ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleModalOpen(`Edit ${subDept.name}`, subDept)}
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

export default SubDepartment;
