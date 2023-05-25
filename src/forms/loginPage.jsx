import React, { useState } from 'react';
import { Form, Input, Button, Alert, Card } from 'antd';

const LoginForm = ({ saveUser }) => {
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (values) => {
        // Sprawdzanie danych logowania w bazie
        const users = [
            { email: 'essa@dbms.com', password: 'pass1' },
            { email: 'bedi2115@dbms.com', password: 'helloworld' },
            { email: 'kokspl@dbms.com', password: 'jdxd' },
            { email: 'admin@t.com', password: 'admin' },
        ];

        const user = users.find((user) => user.email === values.email && user.password === values.password);

        if (user) {
            // Użytkownik uwierzytelniony - możesz wykonać odpowiednie akcje, np. przekierowanie do panelu użytkownika
            alert('Logged in!', user.email);
            saveUser();
            setErrorMessage('');
        } else {
            // Nieprawidłowe dane logowania
            setErrorMessage('Wrong e-mail or password');
        }
    };

    return (
        <Card title="Login" style={{ maxWidth: 320, margin: 'auto' }}>
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
                    rules={[{ required: true, message: 'Enter password' }]}
                >
                    <Input.Password />
                </Form.Item>

                {errorMessage && <Alert type="error" message={errorMessage} />}

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
