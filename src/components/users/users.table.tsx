import { useEffect, useState } from "react";
import "../../styles/users.css";

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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjg3OWY2NjgzZTZiYjgyOTMxOWUyYWY2IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NTI4Mjc5OTQsImV4cCI6MTgzOTIyNzk5NH0.U7RH7ag6YYjl5Qw_nwk5SCAiJoQnQ_3mivGO4EVVdO0";
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
  console.log("List of users:", listUsers);
  return (
    <div>
      <h2>Users Table</h2>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item: IUser) => {
            return (
              <tr key={item._id}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
