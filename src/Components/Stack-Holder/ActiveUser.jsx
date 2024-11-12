import { EditOutlined } from '@ant-design/icons'; // Importing Ant Design icon for editing
import { useState } from 'react'; // Importing useState hook for handling state
import { Pagination } from 'antd'; // Import Pagination from Ant Design
import { SearchOutlined } from '@ant-design/icons'

const adminUserList = [
  { id: 91, name: 'Grand Mostafa l Ababil', email: 'info@hotelgrandmostafa.com', expiredDate: '10-02-2025', createdDate: '10-11-2024', group: 'Not Available', status: 'ACTIVE' },
  { id: 90, name: 'Rose View Hotel', email: 'info@roseviewhotel.com', expiredDate: '29-12-2024', createdDate: '29-10-2024', group: 'Not Available', status: 'ACTIVE' },
  { id: 89, name: 'Sairu Hill Resort Ltd.', email: 'sairuhillresort@gmail.com', expiredDate: '27-12-2024', createdDate: '27-10-2024', group: 'Not Available', status: 'ACTIVE' },
  { id: 88, name: 'Best Western Heritage', email: 'fom@bwheritagehotel.com', expiredDate: '24-01-2025', createdDate: '22-10-2024', group: 'null', status: 'ACTIVE' },
  // Add more entries for pagination demo
  { id: 87, name: 'Hotel Alpha', email: 'alpha@hotel.com', expiredDate: '15-01-2025', createdDate: '15-11-2024', group: 'Not Available', status: 'ACTIVE' },
  { id: 86, name: 'Ocean Resort', email: 'ocean@resort.com', expiredDate: '12-12-2024', createdDate: '12-11-2024', group: 'Not Available', status: 'INACTIVE' },
];


const ActiveUser = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [pageSize, setPageSize] = useState(5); // State for page size
  
    // Handle search input change
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    // Filter adminUserList based on the search term
    const filteredAdminList = adminUserList.filter((admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) // Search by name
    );
  
    // Paginate the filteredAdminList
    const paginatedAdminList = filteredAdminList.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
    // Handle page change
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  return (
    <div className="p-6 bg-gray-100">
    <h2 className="text-2xl font-bold mb-4">Active User</h2>
    <div className="mb-4 flex items-center border border-gray-300 rounded p-2 w-3/6">
<SearchOutlined className="text-gray-500 mr-2" /> {/* Search Icon */}
<input
  type="text"
  placeholder="Search by Admin Name"
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
            <th className="py-3 px-6 text-left">Full-Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-left">Photo</th>
            <th className="py-3 px-6 text-left">Status</th>
            
            
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {paginatedAdminList.map((admin) => (
            <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{admin.id}</td>
              <td className="py-3 px-6 text-left">{admin.name}</td>
              <td className="py-3 px-6 text-left">{admin.email}</td>
              <td className="py-3 px-6 text-left">N/A</td> {/* Replace with phone if available */}
              <td className="py-3 px-6 text-left">{admin.group}</td> {/* Replace with admin type if available */}
              <td className="py-3 px-6 text-left">{admin.status}</td>
              
              <td className="py-3 px-6 text-left">
                <button className="text-blue-500 hover:underline">
                  <EditOutlined /> {/* Ant Design edit icon */}
                </button>
              </td>
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
  </div>
  )
}

export default ActiveUser
