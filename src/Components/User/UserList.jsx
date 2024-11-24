


// import { EditOutlined } from "@ant-design/icons";
// import { useState, useEffect } from "react";
// import { Pagination } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import ApiClient from "./../../Api/ApiClient";

// const UserList = () => {
//   const [adminUserList, setAdminUserList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);

//   // Fetch admin profiles
//   useEffect(() => {
//     const fetchAdminProfiles = async () => {
//       try {
//         const response = await ApiClient.get("/admin/profile");
//         if (response.data?.data) {
//           setAdminUserList(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching admin profiles:", error);
//       }
//     };

//     fetchAdminProfiles();
//   }, []);

//   // Handle search input
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filter and paginate data
//   const filteredAdminList = adminUserList.filter((admin) =>
//     admin.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const paginatedAdminList = filteredAdminList.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-4">User List</h2>
//       <div className="mb-4 flex items-center border border-gray-300 rounded p-2 w-3/6">
//         <SearchOutlined className="text-gray-500 mr-2" />
//         <input
//           type="text"
//           placeholder="Search by User List"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="w-full text-sm outline-none"
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//               <th className="py-3 px-6 text-left font-bold">Id</th>
//               <th className="py-3 px-6 text-left font-bold">Name</th>
//               <th className="py-3 px-6 text-left font-bold">Email</th>
//               <th className="py-3 px-6 text-left font-bold">Phone</th>
//               <th className="py-3 px-6 text-left font-bold">Admin-Type</th>
//               <th className="py-3 px-6 text-left font-bold">Status</th>
//               <th className="py-3 px-6 text-left font-bold">Update</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700 text-sm font-light">
//             {paginatedAdminList.map((admin) => (
//               <tr
//                 key={admin.id}
//                 className="border-b border-gray-200 hover:bg-gray-100"
//               >
//                 <td className="py-3 px-6 text-left whitespace-nowrap font-bold">
//                   {admin.id}
//                 </td>
//                 <td className="py-3 px-6 text-left">{admin.name}</td>
//                 <td className="py-3 px-6 text-left">{admin.email}</td>
//                 <td className="py-3 px-6 text-left">{admin.phone || "N/A"}</td>
//                 <td className="py-3 px-6 text-left">{admin.group || "N/A"}</td>
//                 <td className="py-3 px-6 text-left">{admin.status}</td>
//                 <td className="py-3 px-6 text-left">
//                   <button className="text-blue-500 hover:underline">
//                     <EditOutlined />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-4 flex justify-center">
//         <Pagination
//           current={currentPage}
//           pageSize={pageSize}
//           total={filteredAdminList.length}
//           onChange={handlePageChange}
//           showSizeChanger={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default UserList;



import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ApiClient from "./../../Api/ApiClient";

const UserList = () => {
  const [adminUserList, setAdminUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Fetch admin profiles
  useEffect(() => {
    const fetchAdminProfiles = async () => {
      try {
        const response = await ApiClient.get("/admin/profile");
        if (response.data?.data) {
          setAdminUserList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching admin profiles:", error);
      }
    };

    fetchAdminProfiles();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter and paginate data
  const filteredAdminList = adminUserList.filter((admin) =>
    admin.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedAdminList = filteredAdminList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="mb-4 flex items-center border border-gray-300 rounded p-2 w-3/6">
        <SearchOutlined className="text-gray-500 mr-2" />
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
              <tr
                key={admin.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap font-bold">
                  {admin.id}
                </td>
                <td className="py-3 px-6 text-left">{admin.name}</td>
                <td className="py-3 px-6 text-left">{admin.email}</td>
                <td className="py-3 px-6 text-left">{admin.phone || "N/A"}</td>
                {/* Display Admin-Type or a default value */}
                <td className="py-3 px-6 text-left">{admin.admin_type || "N/A"}</td>
                {/* Display Status based on the admin's status */}
                <td className="py-3 px-6 text-left">{admin.status || "N/A"}</td>
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
};

export default UserList;
