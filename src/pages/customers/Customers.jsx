import { useState } from 'react';
import { Button, Input, List, Space, Form, message, Badge, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useLoaderData } from 'react-router-dom';

import axios from 'axios';
import DynamicTableContent from '../../components/DynamicTable/DynamicTableContent';

const Customers = () => {
    const [newTaskForm] = Form.useForm();
    const [tasksList, setTasksList] = useState(useLoaderData()?.data || []);
    const [messageApi, messageContextHolder] = message.useMessage();

    const addNewTask = (values) => {
        const taskDesc = values.task_desc;
        const taskAge = values.task_age;
        const taskGender = values.task_gender;
        const taskLocation = values.task_location;

        if (!taskDesc || !taskAge || !taskLocation || !taskGender) {
            return;
        }

        newTaskForm.resetFields();

        axios.post('/api/tasks/create', {
            desc: taskDesc,
            age: taskAge,
            gender: taskGender,
            location: taskLocation
        }
        ).then((res) => {
            setTasksList((currentTasksList) => {
                const newTasksList = [...currentTasksList, res.data];
                return newTasksList;
            });
        });
    }

    const deleteTask = (id) => {
        axios.delete('/api/tasks/delete', {
            data: { id: id }
        }).then((res) => {
            if (!res.data.removed) {
                messageApi.open({
                    type: 'error',
                    content: 'Cannot remove picked task'
                });
                return;
            }

            setTasksList((currentTasksList) => {
                const tasksList = [...currentTasksList];
                const tasksListDeleted = tasksList.filter(task => task.id !== id);
                return tasksListDeleted;
            });
        })
    }

    const TaskAdder = () => {
        return (
            <Space>
                <Form
                    name="new_task_form"
                    form={newTaskForm}
                    layout="inline"
                    onFinish={addNewTask}
                >
                    <Space direction="vertical" size={8} align='center'>
                        <Form.Item name="add_task">
                            <Button type="primary" htmlType="submit" >Add Customer</Button>
                        </Form.Item>
                        <Form.Item name="task_desc">
                            <Input.TextArea style={{ width: '400px' }} placeholder='Name' autoSize={true} />
                        </Form.Item>
                        <Form.Item name="task_age">
                            <Input style={{ width: '400px' }} placeholder='Age' autoSize={true} type="number" />
                        </Form.Item>
                        <Form.Item name="task_gender">
                            <Input.TextArea style={{ width: '400px' }} placeholder='Gender' autoSize={true} />
                        </Form.Item>
                        <Form.Item name="task_location">
                            <Input.TextArea style={{ width: '400px' }} placeholder='Location' autoSize={true} />
                        </Form.Item>
                    </Space>
                </Form>
            </Space>
        );
    }

    const TaskColumns = [
        {
            title: "Name",
            dataIndex: "desc",
            align: "center",
            editable: true,
        },
        {
            title: "Age",
            dataIndex: "age",
            align: "center",
            editable: true,
        },
        {
            title: "Gender",
            dataIndex: "gender",
            align: "center",
            editable: true,
        },
        {
            title: "Location",
            dataIndex: "location",
            align: "center",
            editable: true,
        }
    ];
    return (<Space direction='vertical' size='large'>
        <DynamicTableContent
            dataSource={tasksList}
            columns={TaskColumns}
            handleCellSave={() => { }}
        />
        <TaskAdder />
    </Space>);
}

export default Customers;