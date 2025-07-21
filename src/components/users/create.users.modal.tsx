
import { Modal, Input, notification, Form, Select, InputNumber } from 'antd';
import type { FormProps } from 'antd';

interface IProps {
    access_token: string;
    getListUsers: any;
    setIsCreateModalOpen: (isOpen: boolean) => void;
    isCreateModalOpen: boolean;
}

const CreateUsersModal = (props: IProps) => {

    const { access_token, getListUsers, setIsCreateModalOpen, isCreateModalOpen } = props;

    const { Option } = Select;
    const [createForm] = Form.useForm();

    const handleRefreshForm = () => {
        createForm.resetFields();
    }



    const onFinish: FormProps['onFinish'] = async (values) => {
        console.log('Success:', values);

        const newUser = values

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
            title="Add New User"
            //closable={{ 'aria-label': 'Custom Close Button' }}
            open={isCreateModalOpen}
            onOk={() => createForm.submit()}
            onCancel={() => {
                setIsCreateModalOpen(false);
                handleRefreshForm();
            }}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={createForm}
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
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
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

export default CreateUsersModal;