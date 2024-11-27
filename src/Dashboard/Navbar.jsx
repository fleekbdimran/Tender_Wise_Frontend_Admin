
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
//       { key: '4-11', label: <Link to="/published-tender">Published Tender</Link> },
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
//       { key: '4-3', label: <Link to="/activepackage">ActivePackage</Link> },
//       // { key: '8-2', label: 'All Packages' },
//       // { key: '8-3', label: 'Active Packages' },
//       { key: '8-4', label: 'Subscription List' },
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

//   const handleLogout = ()=>{
//     onLogout();
//     localStorage.removeItem('token'); // Clear the token
//   }

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <Menu
//         mode="inline"
//         defaultSelectedKeys={['1']}
//         openKeys={stateOpenKeys}
//         onOpenChange={onOpenChange}
//         style={{ width: 256, flex: '1' }}
//         items={items}
//       />
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



import { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Define menu items with unique keys and sub-menu structure
const items = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: 'Users',
    children: [
      { key: '2-1', label: <Link to="/create-user">Create User</Link> },
      { key: '2-2', label: <Link to="/user-list">User List</Link> },
    ],
  },
  {
    key: '3',
    icon: <AppstoreOutlined />,
    label: 'Stack-Holder',
    children: [
      { key: '3-1', label: <Link to="/all-users">All Users</Link> },
      { key: '3-2', label: <Link to="/active-user">Active User</Link> },
      { key: '3-3', label: <Link to="/inactive-user">In-Active User</Link> },
    ],
  },
  {
    key: '4',
    icon: <AppstoreOutlined />,
    label: 'Tender',
    children: [
      { key: '4-1', label: <Link to="/tenderList">Tender List</Link> },
      { key: '4-1', label: <Link to="/createtender">Create Tender</Link> },
      { key: '4-9', label: <Link to="/viewtenderdetails">View Tender Details</Link> },
      { key: '4-5', label: <Link to="/posttender">Post Tender </Link> },
      {
        key: '4-2',
        label: 'Tender Configure',
        children: [
          { key: '4-3', label: <Link to="/category">Category</Link> },
          { key: '4-4', label: <Link to="/sector">Sector</Link> },
          { key: '4-5', label: <Link to="/subSector">SubSector</Link> },
          { key: '4-6', label: <Link to="/department">Department</Link> },
          { key: '4-7', label: <Link to="/subdepartment">SubDepartment</Link> },
          { key: '4-8', label: <Link to="/division">Division</Link> },
          { key: '4-9', label: <Link to="/district">District</Link> },
          { key: '4-11', label: <Link to="/upazila">Upazila</Link> },
          { key: '4-10', label: <Link to="/source">Source</Link> },
        ],
      },
      {
        key: '4-11',
        label: 'Published Tender',
        children: [
          {
            key: '4-3',
            label: <Link to="/allpublishedtender">All Publish Tender</Link>,
          },
          {
            key: '4-4',
            label: (
              <Link to="/pendingpublishtender">Pending Publish Tender</Link>
            ),
          },
        ],
      },
      { key: '4-12', label: <Link to="/active-tender">Active Tender</Link> },
    ],
  },
  {
    key: '8',
    icon: <AppstoreOutlined />,
    label: 'Subscriptions',
    children: [
      { key: '4-3', label: <Link to="/createpackage">CreatePackage</Link> },
      { key: '4-5', label: <Link to="/allpackagelist">AllPackageList</Link> },
      { key: '4-4', label: <Link to="/activepackage">ActivePackage</Link> },

      { key: '8-4', label: 'Subscription List' },
    ],
  },
  {
    key: '10',
    icon: <AppstoreOutlined />,
    label: 'Contact Us',
    children: [
      { key: '4-9', label: <Link to="/allcontactlist">All Contact List</Link> },
    ],
  },
  {
    key: '9',
    icon: <SettingOutlined />,
    label: 'Settings',
    children: [
      {
        key: '9-1',
        label: <Link to="/company-info-update">Company Info Update</Link>,
      },
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
      // If the clicked key is a top-level key, keep only that submenu open
      setStateOpenKeys([latestOpenKey]);
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token'); // Clear the token
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Logo at the top */}
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <img 
          src="/src/image/Logo.jpg" 
          alt="Logo" 
          style={{ width: '220px', height: 'auto' }} 
        />
      </div>

      {/* Menu Component */}
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256, flex: '1' }}
        items={items}
      />

      {/* Logout Button */}
      <div style={{ padding: '10px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <LogoutOutlined /> Logout
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
