import { useEffect, useState } from "react";
///import "../../styles/users.css";
import { Table, Button, Modal } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
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
    const data = await responseLogin.json();
    console.log("Data fetched:", data);
  };
  const getListUsers = async () => {
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjg3OWY2NjgzZTZiYjgyOTMxOWUyYWY2IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTI4ODU3MjAsImV4cCI6MTgzOTI4NTcyMH0.1q3XI68tQfjot1mKQzhhnb8XnP5UKyDLl40Tc_8QkAU";
    const responseListUsers = await fetch(
      "http://localhost:8000/api/v1/users/all",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const dataListUsers = await responseListUsers.json();
    console.log("List of users:", dataListUsers.data.result);
    setListUsers(dataListUsers.data.result);
  };

  useEffect(() => {
    //getUserLogin();
    getListUsers();
  }, []);
  //Table of antd have columns and dataSource
  //columns is an array of objects that define the structure of the table
  //dataSource is the data that will be displayed in the table
  const columns: TableProps<IUser>['columns'] = [
    {
      title: 'Email',
      dataIndex: 'email',

    },
    {
      title: 'Name',
      dataIndex: 'name',

    },
    {
      title: 'Role',
      dataIndex: 'role',

    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Users Table</h2>
        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={showModal}
        >Add new</Button>
      </div>


      < Table
        dataSource={listUsers}
        columns={columns}
      />
      <Modal
        title="Basic Modal"
        //closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default UsersTable;
