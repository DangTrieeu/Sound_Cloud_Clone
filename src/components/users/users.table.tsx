import { useEffect, useState } from "react";
///import "../../styles/users.css";
import { Table, Button, Modal, Input, notification } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const UsersTable = () => {
  //state
  const [listUsers, setListUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

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


  const refreshForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
  }



  const handleOk = async () => {
    const newUser = {
      name,
      email,
      password,
      age,
      gender,
      address,
      role,
    }
    //console.log("New user data:", newUser);
    const responseCreateUser = await fetch(
      "http://localhost:8000/api/v1/users",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser })
      }
    );
    const dataCreateUser = await responseCreateUser.json();
    console.log("New user created:", dataCreateUser);
    if (dataCreateUser.data) {
      getListUsers(); // Refresh the list of users after creating a new user
      notification.success({
        message: 'Success',
        description: 'User created'
      });
      setIsModalOpen(false);
      refreshForm();
    }
    else {
      notification.error({
        message: 'Error',
        description: dataCreateUser.message || 'Failed to create user'
      });
    }


  };



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Users Table</h2>
        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={() => setIsModalOpen(true)}
        >Add new</Button>
      </div>


      < Table
        dataSource={listUsers}
        columns={columns}
      />
      <Modal
        title="Add New User"
        //closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          refreshForm();
        }}
        maskClosable={false}
      >
        <div>
          <label htmlFor="">Name</label>
          <Input placeholder="Enter name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }} />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <Input placeholder="Enter email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <Input placeholder="Enter password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="">Age</label>
          <Input placeholder="Enter age"
            value={age}
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Gender</label>
          <Input placeholder="Enter gender"
            value={gender}
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Address</label>
          <Input placeholder="Enter address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Role</label>
          <Input placeholder="Enter role"
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
            }}
          />
        </div>

      </Modal>
    </div>
  );
};

export default UsersTable;
