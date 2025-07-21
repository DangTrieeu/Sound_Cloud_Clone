//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Outlet, RouterProvider, Link } from "react-router-dom";
import UsersPage from "./screens/users.page.tsx";
//import './index.css'

import React, { useEffect, useState } from 'react';
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
  const getUserLogin = async () => {
    const responseLogin = await fetch(
      "http://localhost:8000/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "hoidanit@gmail.com",
          password: "123456",
        }),
      }
    );
    const userLogin = await responseLogin.json();
    if (userLogin.data) {
      localStorage.setItem("access_token", userLogin.data.access_token);
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

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
