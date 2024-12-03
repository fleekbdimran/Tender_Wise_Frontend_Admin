
// import { useState } from 'react';
// import { AppstoreOutlined, MailOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// // Define menu items with unique keys and sub-menu structure
// const items = [
//   {
//     key: '1',
//     icon: <MailOutlined />,
//     label: <Link to="/dashboard">Dashboard</Link>,
//   },
//   {
//     key: '2',
//     icon: <AppstoreOutlined />,
//     label: 'Users',
//     children: [
//       { key: '2-1', label: <Link to="/create-user">Create User</Link> },
//       { key: '2-2', label: <Link to="/user-list">User List</Link> },
//     ],
//   },
//   {
//     key: '3',
//     icon: <AppstoreOutlined />,
//     label: 'Stack-Holder',
//     children: [
//       { key: '3-1', label: <Link to="/all-users">All Users</Link> },
//       { key: '3-2', label: <Link to="/active-user">Active User</Link> },
//       { key: '3-3', label: <Link to="/inactive-user">In-Active User</Link> },
//     ],
//   },
//   {
//     key: '4',
//     icon: <AppstoreOutlined />,
//     label: 'Tender',
//     children: [
//       { key: '4-1', label: <Link to="/createtender">Create Tender</Link> },
//       {
//         key: '4-2',
//         label: 'Tender Configure',
//         children: [
//           { key: '4-3', label: <Link to="/category">Category</Link> },
//           { key: '4-4', label: <Link to="/sector">Sector</Link> },
//           { key: '4-5', label: <Link to="/subSector">SubSector</Link> },
//           { key: '4-6', label: <Link to="/department">Department</Link> },
//           { key: '4-7', label: <Link to="/subdepartment">SubDepartment</Link> },
//           { key: '4-8', label: <Link to="/division">Division</Link> },
//           { key: '4-9', label: <Link to="/district">District</Link> },
//           { key: '4-11', label: <Link to="/upazila">Upazila</Link> },
//           { key: '4-10', label: <Link to="/source">Source</Link> },
//         ],
//       },
//       {
//         key: '4-11',
//         label: 'Published Tender',
//         children: [
//           {
//             key: '4-3',
//             label: <Link to="/allpublishedtender">All Publish Tender</Link>,
//           },
//           {
//             key: '4-4',
//             label: (
//               <Link to="/pendingpublishtender">Pending Publish Tender</Link>
//             ),
//           },
//         ],
//       },
//       { key: '4-12', label: <Link to="/active-tender">Active Tender</Link> },
//     ],
//   },
//   // {
//   //   key: '5',
//   //   icon: <AppstoreOutlined />,
//   //   label: 'Courses',
//   //   children: [
//   //     { key: '5-1', label: 'Create Course' },
//   //     { key: '5-2', label: 'All Courses' },
//   //     { key: '5-3', label: 'Published Courses' },
//   //     { key: '5-4', label: 'Active Courses' },
//   //   ],
//   // },
//   // {
//   //   key: '6',
//   //   icon: <AppstoreOutlined />,
//   //   label: 'Teachers',
//   //   children: [
//   //     { key: '6-1', label: 'Create Teacher' },
//   //     { key: '6-2', label: 'All Teachers' },
//   //     { key: '6-3', label: 'Active Teacher' },
//   //   ],
//   // },
//   // {
//   //   key: '7',
//   //   icon: <AppstoreOutlined />,
//   //   label: 'Candidates',
//   //   children: [
//   //     { key: '7-1', label: 'All Candidates' },
//   //     { key: '7-2', label: 'Active Candidates' },
//   //   ],
//   // },
//   {
//     key: '8',
//     icon: <AppstoreOutlined />,
//     label: 'Subscriptions',
//     children: [
//       { key: '4-3', label: <Link to="/createpackage">CreatePackage</Link> },
//       { key: '4-5', label: <Link to="/allpackagelist">AllPackageList</Link> },
//       { key: '4-4', label: <Link to="/activepackage">ActivePackage</Link> },

//       { key: '8-4', label: 'Subscription List' },
//     ],
//   },
//   {
//     key: '10',
//     icon: <AppstoreOutlined />,
//     label: 'Contact Us',
//     children: [
//       { key: '4-9', label: <Link to="/allcontactlist">All Contact List</Link> },
//     ],
//   },
//   {
//     key: '9',
//     icon: <SettingOutlined />,
//     label: 'Settings',
//     children: [
//       {
//         key: '9-1',
//         label: <Link to="/company-info-update">Company Info Update</Link>,
//       },
//     ],
//   },
// ];

// // Utility to create a key-to-level map for submenu control
// const getLevelKeys = (items) => {
//   const keyMap = {};
//   const assignLevels = (items, level = 1) => {
//     items.forEach((item) => {
//       if (item.key) keyMap[item.key] = level;
//       if (item.children) assignLevels(item.children, level + 1);
//     });
//   };
//   assignLevels(items);
//   return keyMap;
// };

// const levelKeys = getLevelKeys(items);

// const Navbar = ({ onLogout }) => {
//   const [stateOpenKeys, setStateOpenKeys] = useState([]);

//   // Manage open keys to control submenu visibility
//   const onOpenChange = (openKeys) => {
//     const latestOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
    
//     if (latestOpenKey && levelKeys[latestOpenKey] === 1) {
//       // If the clicked key is a top-level key, keep only that submenu open
//       setStateOpenKeys([latestOpenKey]);
//     } else {
//       setStateOpenKeys(openKeys);
//     }
//   };

//   const handleLogout = ()=>{
//     onLogout();
//     localStorage.removeItem('token'); // Clear the token
//   }

//   return (
//     <div  style={{ display: 'flex',  flexDirection: 'column', height: '100vh' }}>
//       {/* Logo at the top */}
//       <div style={{ textAlign: 'center', padding: '20px' }}>
//         <img 
//           src="/src/image/Logo.jpg" 
//           alt="Logo" 
//           style={{ width: '220px', height: 'auto' }} 
//         />
//       </div>

//       {/* Menu Component */}
//       <Menu
//         mode="inline"
//         defaultSelectedKeys={['1']}
//         openKeys={stateOpenKeys}
//         onOpenChange={onOpenChange}
//         style={{ width: 256, flex: '1' }}
//         items={items}
//       />

//       {/* Logout Button */}
//       <div style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
//         <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//           <LogoutOutlined /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// Navbar.propTypes = {
//   onLogout: PropTypes.func.isRequired,
// };

// export default Navbar;




// import { useState } from 'react';
// import { AppstoreOutlined, MailOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';




// // Define menu items with unique keys and sub-menu structure
// const items = [
//   {
//     key: '1',
//     icon: <MailOutlined />,
//     label: <Link to="/dashboard">Dashboard</Link>,
//   },
//   {
//     key: '2',
//     icon: <AppstoreOutlined />,
//     label: 'Users',
//     children: [
//       { key: '2-1', label: <Link to="/create-user">Create User</Link> },
//       { key: '2-2', label: <Link to="/user-list">User List</Link> },
//     ],
//   },
//   {
//     key: '3',
//     icon: <AppstoreOutlined />,
//     label: 'Stack-Holder',
//     children: [
//       { key: '3-1', label: <Link to="/all-users">All Users</Link> },
//       { key: '3-2', label: <Link to="/active-user">Active User</Link> },
//       { key: '3-3', label: <Link to="/inactive-user">In-Active User</Link> },
//     ],
//   },
//   {
//     key: '4',
//     icon: <AppstoreOutlined />,
//     label: 'Tender',
//     children: [
//       { key: '4-2', label: <Link to="/createtenderForm">Create Tender</Link> },
//       { key: '4-1', label: <Link to="/tenderList">Tender List</Link> },
//       { key: '4-4', label: <Link to="/publishedtender">Published Tender</Link> },
//       { key: '4-3', label: <Link to="/activetender">Active Tender</Link> },
      
//       {
//         key: '4-2',
//         label: 'Tender Configure',
//         children: [
//           { key: '4-3', label: <Link to="/category">Category</Link> },
//           { key: '4-4', label: <Link to="/sector">Sector</Link> },
//           { key: '4-5', label: <Link to="/subSector">SubSector</Link> },
//           { key: '4-6', label: <Link to="/department">Department</Link> },
//           { key: '4-7', label: <Link to="/subdepartment">SubDepartment</Link> },
//           { key: '4-8', label: <Link to="/division">Division</Link> },
//           { key: '4-9', label: <Link to="/district">District</Link> },
//           { key: '4-11', label: <Link to="/upazila">Upazila</Link> },
//           { key: '4-10', label: <Link to="/source">Source</Link> },
//         ],
//       },
  
//     ],
//   },
//   { key: '15',
//     icon: <AppstoreOutlined />,
//     label: 'Tender Request',
//     children: [
//       { key: '4-3', label: <Link to="/allpublishedtender">All Tender Request</Link> },
//       { key: '4-4', label: <Link to="/pendingpublishtender">All Pending Tender</Link> },
//       // { key: '4-5', label: <Link to="/viewpage">View Page</Link> },
//     ],
//   },
//   {
//     key: '8',
//     icon: <AppstoreOutlined />,
//     label: 'Subscriptions',
//     children: [
//       { key: '4-3', label: <Link to="/createpackage">Create Package</Link> },
//       { key: '4-5', label: <Link to="/allpackagelist">All Package List</Link> },
//       { key: '4-4', label: <Link to="/activepackage">Active Package</Link> },
//       { key: '8-4', label: 'Subscription List' },
//     ],
//   },

//   {
//     key: '10',
//     icon: <AppstoreOutlined />,
//     label: 'Contact Us',
//     children: [
//       { key: '4-9', label: <Link to="/allcontactlist">All Contact List</Link> },
//     ],
//   },
//   {
//     key: '9',
//     icon: <SettingOutlined />,
//     label: 'Settings',
//     children: [
//       { key: '9-1', label: <Link to="/company-info-update">Company Info Update</Link> },
//     ],
//   },
// ];

// // Utility to create a key-to-level map for submenu control
// const getLevelKeys = (items) => {
//   const keyMap = {};
//   const assignLevels = (items, level = 1) => {
//     items.forEach((item) => {
//       if (item.key) keyMap[item.key] = level;
//       if (item.children) assignLevels(item.children, level + 1);
//     });
//   };
//   assignLevels(items);
//   return keyMap;
// };

// const levelKeys = getLevelKeys(items);

// const Navbar = ({ onLogout }) => {
//   const [stateOpenKeys, setStateOpenKeys] = useState([]);

//   // Manage open keys to control submenu visibility
//   const onOpenChange = (openKeys) => {
//     const latestOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
    
//     if (latestOpenKey && levelKeys[latestOpenKey] === 1) {
//       // If the clicked key is a top-level key, keep only that submenu open
//       setStateOpenKeys([latestOpenKey]);
//     } else {
//       setStateOpenKeys(openKeys);
//     }
//   };

//   const handleLogout = () => {
//     onLogout();
//     localStorage.removeItem('token'); // Clear the token
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       {/* Fixed Sidebar with Navbar */}
//       <div style={{ width: '256px', position: 'fixed', top: '0', left: '0', bottom: '0', backgroundColor: '#fff', boxShadow: '2px 0px 10px rgba(0,0,0,0.1)', overflowY: 'auto' }}>
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//           <img 
//             src="/src/image/Logo.jpg" 
//             alt="Logo" 
//             style={{ width: '220px', height: 'auto' }} 
//           />
//         </div>

//         {/* Menu Component */}
//         <Menu
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           openKeys={stateOpenKeys}
//           onOpenChange={onOpenChange}
//           style={{ width: '256px' }}
//           items={items}
//         />

//         {/* Logout Button */}
//         <div style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
//           <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//             <LogoutOutlined /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div style={{ marginLeft: '256px', flex: '1', padding: '20px' }}>
//         {/* Main content here */}
//       </div>
//     </div>
//   );
// };

// Navbar.propTypes = {
//   onLogout: PropTypes.func.isRequired,
// };

// export default Navbar;



import { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// Define menu items with unique keys and sub-menu structure
const items = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "Users",
    children: [
      { key: "2-1", label: <Link to="/create-user">Create User</Link> },
      { key: "2-2", label: <Link to="/user-list">User List</Link> },
    ],
  },
  {
    key: "3",
    icon: <AppstoreOutlined />,
    label: "Stack-Holder",
    children: [
      { key: "3-1", label: <Link to="/all-users">All Users</Link> },
      { key: "3-2", label: <Link to="/active-user">Active User</Link> },
      { key: "3-3", label: <Link to="/inactive-user">In-Active User</Link> },
    ],
  },
  {
    key: "4",
    icon: <AppstoreOutlined />,
    label: "Tender",
    children: [
      { key: "4-2", label: <Link to="/createtenderForm">Create Tender</Link> },
      { key: "4-1", label: <Link to="/tenderList">Tender List</Link> },
      
      { key: "4-3", label: <Link to="/activetender">Active Tender</Link> },
      { key: "4-4", label: <Link to="/publishedtender">Published Tender</Link> },
      { key: "4-5-1", label: <Link to="/pendingtender">Pending Tender</Link> },
      {
        key: "4-5",
        label: "Tender Configure",
        children: [
          { key: "4-6", label: <Link to="/category">Category</Link> },
          { key: "4-7", label: <Link to="/sector">Sector</Link> },
          { key: "4-8", label: <Link to="/subSector">SubSector</Link> },
          { key: "4-9", label: <Link to="/department">Department</Link> },
          { key: "4-10", label: <Link to="/division">Division</Link> },
          { key: "4-11", label: <Link to="/district">District</Link> },
          { key: "4-12", label: <Link to="/upazila">Upazila</Link> },
          { key: "4-13", label: <Link to="/source">Source</Link> },
        ],
      },
    ],
  },
  {
    key: "15",
    icon: <AppstoreOutlined />,
    label: "Tender Request",
    children: [
      { key: "15-1", label: <Link to="/allpublishedtender">All Tender Request</Link> },
      { key: "15-2", label: <Link to="/pendingpublishtender">Pending Tender Request</Link> },
      { key: "15-3", label: <Link to="/publishtenderrequest">Published Tender Request</Link> },
    ],
  },
  {
    key: "8",
    icon: <AppstoreOutlined />,
    label: "Subscriptions",
    children: [
      { key: "8-1", label: <Link to="/createpackage">Create Package</Link> },
      { key: "8-2", label: <Link to="/allpackagelist">All Packages</Link> },
      { key: "8-3", label: <Link to="/activepackage">Active Packages</Link> },
    ],
  },
  {
    key: "10",
    icon: <AppstoreOutlined />,
    label: "Contact Us",
    children: [
      { key: "10-1", label: <Link to="/allcontactlist">Contact List</Link> },
      // { key: "10-2", label: <Link to="/contactusdetails">Contact Us Details</Link> }

    ],
  },
  {
    key: "9",
    icon: <SettingOutlined />,
    label: "Settings",
    children: [
      { key: "9-1", label: <Link to="/company-info-update">Update Company Info</Link> },
    ],
  },
];

// Utility to create a key-to-level map for submenu control
const getLevelKeys = (items) => {
  const keyMap = {};
  const assignLevels = (items, level = 1) => {
    items.forEach((item) => {
      if (item.key) keyMap[item.key] = level;
      if (item.children) assignLevels(item.children, level + 1);
    });
  };
  assignLevels(items);
  return keyMap;
};

const levelKeys = getLevelKeys(items);

const Navbar = ({ onLogout }) => {
  const [stateOpenKeys, setStateOpenKeys] = useState([]);

  // Manage open keys to control submenu visibility
  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
    if (latestOpenKey && levelKeys[latestOpenKey] === 1) {
      setStateOpenKeys([latestOpenKey]);
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  // Logout confirmation using SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "w-72 h-auto p-3",
        title: "text-lg",
        content: "text-xs",
        confirmButton: "bg-blue-500 text-white px-4 py-1 text-sm rounded-md",
        cancelButton: "bg-red-500 px-4 py-1 text-sm rounded-md",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Clear the token
        onLogout(); // Trigger logout action
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          confirmButtonText: "Okay",
          customClass: {
            popup: "w-72 h-auto p-3",
            title: "text-lg",
            content: "text-xs",
            confirmButton: "bg-blue-500 text-white px-4 py-1 text-sm rounded-md",
          },
        });
      }
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "256px",
          position: "fixed",
          top: "0",
          left: "0",
          bottom: "0",
          backgroundColor: "#fff",
          boxShadow: "2px 0px 10px rgba(0,0,0,0.1)",
          overflowY: "auto",
        }}
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <img
            src="/src/image/Logo.jpg"
            alt="Logo"
            style={{ width: "220px", height: "auto" }}
          />
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          style={{ width: "256px" }}
          items={items}
        />

        {/* Logout Button */}
        <div
          style={{
            padding: "10px",
            textAlign: "center",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "#ff4d4f",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <LogoutOutlined /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ marginLeft: "256px", flex: "1", padding: "20px" }}>
        {/* Add main content here */}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
