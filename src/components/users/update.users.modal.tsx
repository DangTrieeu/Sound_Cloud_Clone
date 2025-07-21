import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, notification } from 'antd';

interface IProps {
    access_token: string;
    getListUsers: any;
    setIsUpdateModalOpen: (isOpen: boolean) => void;
    isUpdateModalOpen: boolean;
    selectedUser: any;
    setSelectedUser: (user: any) => void;
}

const UpdateUsersModal = (props: IProps) => {

    const { access_token, getListUsers, setIsUpdateModalOpen, isUpdateModalOpen, selectedUser, setSelectedUser } = props;
    //console.log("Selected user in UpdateUsersModal:", selectedUser);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    const handleRefreshForm = () => {
        setSelectedUser(null);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
    }


    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name || "");
            setEmail(selectedUser.email || "");
            setPassword(selectedUser.password || "");
            setAge(selectedUser.age || "");
            setGender(selectedUser || "");
            setAddress(selectedUser.address || "");
            setRole(selectedUser.role || "");
        }
    }, [selectedUser]);


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

        const responseCreateUser = await fetch(
            "http://localhost:8000/api/v1/users",
            {
                method: "PATCH",
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
            setIsUpdateModalOpen(false);
            handleRefreshForm();
        }
        else {
            notification.error({
                message: 'Error',
                description: dataCreateUser.message || 'Failed to create user'
            });
        }


    };

    return (

        <Modal
            title="Update User"
            //closable={{ 'aria-label': 'Custom Close Button' }}
            open={isUpdateModalOpen}
            onOk={handleOk}
            onCancel={() => {
                handleRefreshForm();
                setIsUpdateModalOpen(false);
            }}
            maskClosable={false}

        >
            <div>
                <label >Name</label>
                <Input
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }} />
            </div>
            <div>
                <label >Email</label>
                <Input
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
            </div>
            <div>
                <label >Password</label>
                <Input
                    disabled={true}
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
            </div>

            <div>
                <label >Age</label>
                <Input
                    value={age}
                    onChange={(event) => {
                        setAge(event.target.value);
                    }}
                />
            </div>
            <div>
                <label >Gender</label>
                <Input
                    value={gender}
                    onChange={(event) => {
                        setGender(event.target.value);
                    }}
                />
            </div>
            <div>
                <label >Address</label>
                <Input
                    value={address}
                    onChange={(event) => {
                        setAddress(event.target.value);
                    }}
                />
            </div>
            <div>
                <label >Role</label>
                <Input
                    value={role}
                    onChange={(event) => {
                        setRole(event.target.value);
                    }}
                />
            </div>

        </Modal>
    )
}

export default UpdateUsersModal;