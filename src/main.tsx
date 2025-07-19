//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Outlet, RouterProvider, Link } from "react-router-dom";
import UsersPage from "./screens/users.page.tsx";
//import './index.css'

import React, { useState } from 'react';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={"/users"}>Manage Users</Link>,
    key: 'users',
    icon: <UserOutlined />,

  },
  // {
  //   label: 'Navigation Three - Submenu',
  //   key: 'SubMenu',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: 'group',
  //       label: 'Item 1',
  //       children: [
  //         { label: 'Option 1', key: 'setting:1' },
  //         { label: 'Option 2', key: 'setting:2' },
  //       ],
  //     },
  //     {
  //       type: 'group',
  //       label: 'Item 2',
  //       children: [
  //         { label: 'Option 3', key: 'setting:3' },
  //         { label: 'Option 4', key: 'setting:4' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   key: 'alipay',
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  // },
];

const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <footer><h1>footer</h1></footer>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
    ]
  },


  {
    path: "/tracks",
    element: (
      <div>
        <h1>MANAGE TRACKS</h1>
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
