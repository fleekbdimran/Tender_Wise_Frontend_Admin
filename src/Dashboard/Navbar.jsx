
import { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

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
      { key: '2-3', label: <Link to="/user-list">User List</Link> },
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
      { key: '4-1', label: <Link to="/create-tender">Create Tender</Link> },
      {
        key: '4-2',
        label: 'Tender Configure',
        children: [
          { key: '4-3', label: <Link to="/category">Category</Link> },
          { key: '4-4', label: <Link to="/sector">Sector</Link> },
          { key: '4-4', label: <Link to="/Sub-Sector">Sub-Sector</Link> },
          { key: '4-4', label: <Link to="/Department">Department</Link> },
          { key: '4-4', label: <Link to="/Sub-Department">Sub-Department</Link> },
          { key: '4-4', label: <Link to="/Division">Division</Link> },
          { key: '4-4', label: <Link to="/sector">District</Link> },
          { key: '4-4', label: <Link to="/sector">Source paper</Link> },
        
          // Other nested links for Tender Configure...
        ],
      },
      { key: '4-11', label: <Link to="/published-tender">Published Tender</Link> },
      { key: '4-12', label: <Link to="/active-tender">Active Tender</Link> },
    ],
  },
  // Other items continue here similarly...
  {
    key: '5',
    icon: <AppstoreOutlined />,
    label: 'Courses',
    children: [
      { key: '5-1', label: 'Create Course' },
      { key: '5-2', label: 'All Courses' },
      { key: '5-3', label: 'Published Courses' },
      { key: '5-4', label: 'Active Courses' },
    ],
  },
  {
    key: '6',
    icon: <AppstoreOutlined />,
    label: 'Teachers',
    children: [
      { key: '6-1', label: 'Create Teacher' },
      { key: '6-2', label: 'All Teachers' },
      { key: '6-3', label: 'Active Teacher' },
    ],
  },
  {
    key: '7',
    icon: <AppstoreOutlined />,
    label: 'Candidates',
    children: [
      { key: '7-1', label: 'All Candidates' },
      { key: '7-2', label: 'Active Candidates' },
    ],
  },
  {
    key: '8',
    icon: <AppstoreOutlined />,
    label: 'Subscriptions',
    children: [
      { key: '8-1', label: 'Create Package' },
      { key: '8-2', label: 'All Packages' },
      { key: '8-3', label: 'Active Packages' },
      { key: '8-4', label: 'Subscription List' },
    ],
  },
  {
    key: '9',
    icon: <SettingOutlined />,
    label: 'Settings',
    children: [
      { key: '9-1', label: <Link to="/company-info-update">Company Info Update</Link> },
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

const Navbar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2']);
  
  // Manage open keys to control submenu visibility
  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
    if (latestOpenKey) {
      setStateOpenKeys(openKeys.filter((key) => levelKeys[key] <= levelKeys[latestOpenKey]));
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default Navbar;
