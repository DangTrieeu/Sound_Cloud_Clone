import { useEffect, useState } from "react";
///import "../../styles/users.css";
import { Table, Button, Modal, Input, notification } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import CreateUsersModal from "./create.users.modal";
import UpdateUsersModal from "./update.users.modal";

interface IUser {
  _id: string;

  name: string;
  email: string;
  password?: string;
  age?: number
  gender?: string;
  address?: string;
  role: string;
}

const UsersTable = () => {
  //state
  const [listUsers, setListUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | IUser>(null);
  const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjg3OWY2NjgzZTZiYjgyOTMxOWUyYWY2IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTI4OTkzNDgsImV4cCI6MTgzOTI5OTM0OH0.uNZ8HjZunJDjD9BnGxuRVCUJzEqO7DabJVRK2OKL0Sg";

  //fetch data from API
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
    //console.log("List of users:", dataListUsers.data.result);
    if (!dataListUsers.data) {
      notification.error({
        message: dataListUsers.message || "Error fetching users",
      });
      return;
    }
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
    {
      title: 'Actions',
      render: (value, record) => {
        return (
          <div>
            <button onClick={() => {
              setIsUpdateModalOpen(true);
              setSelectedUser(record);
            }}>
              Edit
            </button>
          </div>
        )
      }

    },
  ];






  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Users Table</h2>
        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >Add new</Button>
      </div>


      < Table
        dataSource={listUsers}
        columns={columns}
      />
      <CreateUsersModal
        access_token={access_token}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        getListUsers={getListUsers}
      />

      <UpdateUsersModal
        access_token={access_token}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        getListUsers={getListUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

    </div>
  );
};

export default UsersTable;
