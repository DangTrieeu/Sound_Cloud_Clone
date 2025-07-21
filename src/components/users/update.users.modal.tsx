import React, { useEffect, useState } from 'react';
import { Modal, Input, notification, Form, Select, InputNumber } from 'antd';
import type { FormProps } from 'antd';

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



    const { Option } = Select;
    const [form] = Form.useForm();

    const handleRefreshForm = () => {
        form.resetFields();
    }


    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                name: selectedUser.name,
                email: selectedUser.email,
                age: selectedUser.age,
                gender: selectedUser.gender,
                address: selectedUser.address,
                role: selectedUser.role,
            })
        }
    }, [selectedUser]);



    const onFinish: FormProps['onFinish'] = async (values) => {
        console.log('Success:', values);

        const { name, email, age, gender, address, role } = values

        const dataUpdateUser = {
            _id: selectedUser?._id,
            name, email, age, gender, address, role
        }

        const responseCreateUser = await fetch(
            "http://localhost:8000/api/v1/users",
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataUpdateUser)
            }
        );
        const dataCreateUser = await responseCreateUser.json();
        if (dataCreateUser.data) {
            getListUsers(); // Refresh the list of users after creating a new user
            notification.success({
                message: 'Success',
                description: 'User updated'
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
            onOk={() => form.submit()}
            onCancel={() => {
                handleRefreshForm();
                setIsUpdateModalOpen(false);
            }}
            maskClosable={false}

        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
                style={{ marginBottom: 3 }}
            >
                <Form.Item
                    style={{ marginBottom: 3 }}
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 3 }}
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 3 }}
                    label="Password"
                    name="password"
                //rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password disabled={selectedUser ? true : false} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 3 }}
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: 'Please input your age!' }]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 3 }}
                    name="gender" label="Gender" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="MALE">MALE</Option>
                        <Option value="FEMALE">FEMALE</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 3 }}
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 3 }}
                    name="role" label="Role" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="ADMIN">ADMIN</Option>
                        <Option value="USER">USER</Option>
                    </Select>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default UpdateUsersModal;