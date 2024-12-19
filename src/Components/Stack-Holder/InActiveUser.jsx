


import { useState, useEffect } from 'react'; // Importing useState and useEffect hooks for handling state
import { Pagination } from 'antd'; // Import Pagination from Ant Design
import { SearchOutlined } from '@ant-design/icons';
import ApiClient from '../../Api/ApiClient'; // Import API client

const InActiveUser = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [pageSize, setPageSize] = useState(10); // State for page size
  const [adminUserList, setAdminUserList] = useState([]); // State for storing fetched user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiClient.get('/admin/stakeholder');
        // Filter to include only inactive users
        const inactiveUsers = response.data.data.filter(
          (user) => user.otp_status === 0 || user.status === 'inactive'
        );
        setAdminUserList(inactiveUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  


  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };



  const filteredAdminList = adminUserList;


  // Paginate the filteredAdminList
  const paginatedAdminList = filteredAdminList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">In Active Users</h2>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="mb-4 flex items-center border border-gray-300 rounded p-2 w-3/6">
            <SearchOutlined className="text-gray-500 mr-2" /> {/* Search Icon */}
            <input
              type="text"
              placeholder="Search by User Name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full text-sm outline-none"
            />
          </div>
         

<div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-200">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Id</th>
        <th className="py-3 px-6 text-left">Full Name</th>
        <th className="py-3 px-6 text-left">Email</th>
        <th className="py-3 px-6 text-left">Phone</th>
        <th className="py-3 px-6 text-left">Address</th>
        <th className="py-3 px-6 text-left">Otp Status</th>
        {/* <th className="py-3 px-6 text-left">Status</th> */}
      </tr>
    </thead>
    <tbody className="text-gray-700 text-sm font-light">
      {paginatedAdminList.map((admin, index) => (
        <tr
          key={admin.id}
          className="border-b border-gray-200 hover:bg-gray-100"
        >
          <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
          <td className="py-3 px-6 text-left">{admin.full_name || 'N/A'}</td>
          <td className="py-3 px-6 text-left">{admin.email || 'N/A'}</td>
          <td className="py-3 px-6 text-left">{admin.phone || 'N/A'}</td>
          <td className="py-3 px-6 text-left">{admin.address || 'N/A'}</td>
          <td className="py-3 px-6 text-left">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                admin.otp_status === 0
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {admin.otp_status === 0 ? 'Non-Verified' : 'Verified'}
            </span>
          </td>
          {/* <td className="py-3 px-6 text-left">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                admin.status === 'inactive'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {admin.status === 'inactive' ? 'Inactive' : 'Active'}
            </span>
          </td> */}
        </tr>
      ))}
    </tbody>
  </table>
</div>


          {/* Pagination Component */}
          <div className="mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredAdminList.length}
              onChange={handlePageChange} // Handle page change
              showSizeChanger={false} // Disable changing page size
            />
          </div>
        </>
      )}
    </div>
  );
};

export default InActiveUser;
