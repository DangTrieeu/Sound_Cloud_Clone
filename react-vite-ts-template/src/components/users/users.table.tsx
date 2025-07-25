import { useEffect, useState } from "react";
///import "../../styles/users.css";
import { Table, Button, notification, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
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
  const access_token = localStorage.getItem("access_token") || "";

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,

  }
  );

  const handleOnChangePagination = async (page: number, pageSize: number) => {
    const responseListUsers = await fetch(
      `http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`,
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
    setMeta({
      current: dataListUsers.data.meta.current,
      pageSize: dataListUsers.data.meta.pageSize,
      pages: dataListUsers.data.meta.pages,
      total: dataListUsers.data.meta.total,
    });
  }

  //fetch data from API
  const getListUsers = async () => {
    const responseListUsers = await fetch(
      `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
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
    setMeta({
      current: dataListUsers.data.meta.current,
      pageSize: dataListUsers.data.meta.pageSize,
      pages: dataListUsers.data.meta.pages,
      total: dataListUsers.data.meta.total,
    });
  };

  const deleteUser = async (userId: string) => {

    const responseDeleteUser = await fetch(
      `http://localhost:8000/api/v1/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const dataDeleteUser = await responseDeleteUser.json();

    if (dataDeleteUser.data) {
      getListUsers(); // Refresh the list of users after deleting a user
      notification.success({
        message: 'Success',
        description: 'User deleted'
      });
    } else {
      notification.error({
        message: 'Error',
        description: dataDeleteUser.message || 'Error deleting user'
      });
    }
  }

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
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              type="default"
              style={{ backgroundColor: '#faad14', color: 'white' }}
              onClick={() => {
                setIsUpdateModalOpen(true);
                setSelectedUser(record);
              }}>
              Edit
            </Button>

            <Popconfirm
              title="Delete the User"
              placement="rightTop"
              description={`Are you sure to delete user ${record.name} ?`}
              onConfirm={() => deleteUser(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>


          </div >
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
        rowKey="_id"
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total) => `Total ${total} items`,
          onChange: (page: number, pageSize: number) => handleOnChangePagination(page, pageSize),
        }}
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
