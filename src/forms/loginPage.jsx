import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';

const LoginForm = ({ setIsLoggedIn }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        // Tutaj możesz wykonać żądanie HTTP lub inne operacje, np. sprawdzanie poprawności danych logowania
        setIsLoggedIn(true)
    };

    return (
        <Card title={"Login"}>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Enter e-mail' },
                        { type: 'email', message: 'Wrong e-mail' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Enter passoword' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default LoginForm;
