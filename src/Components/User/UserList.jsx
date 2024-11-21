
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

const adminUserList = [
  { id: 91, name: 'Grand Mostafa l Ababil', email: 'info@hotelgrandmostafa.com', expiredDate: '10-02-2025', createdDate: '10-11-2024', group: 'Not Available', status: 'ACTIVE' },
  { id: 90, name: 'Rose View Hotel', email: 'info@roseviewhotel.com', expiredDate: '29-12-2024', createdDate: '29-10-2024', group: 'Not Available', status: 'ACTIVE' },
  { id: 89, name: 'Sairu Hill Resort Ltd.', email: 'sairuhillresort@gmail.com', expiredDate: '27-12-2024', createdDate: '27-10-2024', group: 'Not Available', status: 'ACTIVE' },
  { id: 88, name: 'Best Western Heritage', email: 'fom@bwheritagehotel.com', expiredDate: '24-01-2025', createdDate: '22-10-2024', group: 'null', status: 'ACTIVE' },
  { id: 87, name: 'Hotel Alpha', email: 'alpha@hotel.com', expiredDate: '15-01-2025', createdDate: '15-11-2024', group: 'Not Available', status: 'ACTIVE' },
  { id: 86, name: 'Ocean Resort', email: 'ocean@resort.com', expiredDate: '12-12-2024', createdDate: '12-11-2024', group: 'Not Available', status: 'INACTIVE' },
];

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdminList = adminUserList.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAdminList = filteredAdminList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="mb-4 flex items-center border border-gray-300 rounded p-2 w-3/6">
        <SearchOutlined className="text-gray-500 mr-2" /> {/* Search Icon */}
        <input
          type="text"
          placeholder="Search by User List"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full text-sm outline-none"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left font-bold">Id</th>
              <th className="py-3 px-6 text-left font-bold">Name</th>
              <th className="py-3 px-6 text-left font-bold">Email</th>
              <th className="py-3 px-6 text-left font-bold">Phone</th>
              <th className="py-3 px-6 text-left font-bold">Admin-Type</th>
              <th className="py-3 px-6 text-left font-bold">Status</th>
              <th className="py-3 px-6 text-left font-bold">Update</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {paginatedAdminList.map((admin) => (
              <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap font-bold">{admin.id}</td>
                <td className="py-3 px-6 text-left">{admin.name}</td>
                <td className="py-3 px-6 text-left">{admin.email}</td>
                <td className="py-3 px-6 text-left">N/A</td>
                <td className="py-3 px-6 text-left">{admin.group}</td>
                <td className="py-3 px-6 text-left">{admin.status}</td>
                <td className="py-3 px-6 text-left">
                  <button className="text-blue-500 hover:underline">
                    <EditOutlined />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredAdminList.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default UserList;
