import React, { useState } from 'react';
import { Modal, Input, Button, notification } from 'antd';

interface IProps {
    access_token: string;
    getListUsers: any;
    setIsCreateModalOpen: (isOpen: boolean) => void;
    isCreateModalOpen: boolean;
}

const CreateUsersModal = (props: IProps) => {

    const { access_token, getListUsers, setIsCreateModalOpen, isCreateModalOpen } = props;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

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
            setIsCreateModalOpen(false);
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
        <Modal
            title="Add New User"
            //closable={{ 'aria-label': 'Custom Close Button' }}
            open={isCreateModalOpen}
            onOk={handleOk}
            onCancel={() => {
                setIsCreateModalOpen(false);
                refreshForm();
            }}
            maskClosable={false}
        >
            <div>
                <label >Name</label>
                <Input placeholder="Enter name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }} />
            </div>
            <div>
                <label >Email</label>
                <Input placeholder="Enter email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
            </div>
            <div>
                <label >Password</label>
                <Input placeholder="Enter password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
            </div>

            <div>
                <label >Age</label>
                <Input placeholder="Enter age"
                    value={age}
                    onChange={(event) => {
                        setAge(event.target.value);
                    }}
                />
            </div>
            <div>
                <label >Gender</label>
                <Input placeholder="Enter gender"
                    value={gender}
                    onChange={(event) => {
                        setGender(event.target.value);
                    }}
                />
            </div>
            <div>
                <label >Address</label>
                <Input placeholder="Enter address"
                    value={address}
                    onChange={(event) => {
                        setAddress(event.target.value);
                    }}
                />
            </div>
            <div>
                <label >Role</label>
                <Input placeholder="Enter role"
                    value={role}
                    onChange={(event) => {
                        setRole(event.target.value);
                    }}
                />
            </div>

        </Modal>
    )
}

export default CreateUsersModal;