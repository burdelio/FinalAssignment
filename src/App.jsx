import { useState } from 'react'
import { Button, Checkbox, Input, List, Typography, Space, Form, message, Badge, Tooltip } from 'antd'
import { DeleteOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { useLoaderData } from 'react-router-dom';

import './App.css'
import axios from 'axios';

const App = () => {
  const [tasksList, setTasksList] = useState(useLoaderData().data)
  const [newTaskForm] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage();

  const addNewTask = (values) => {
    const taskDesc = values.task_desc;
    const taskAge = values.task_age;
    const taskLocation = values.task_location;

    if (!taskDesc || !taskAge || !taskLocation) {
      return;
    }

    newTaskForm.resetFields();

    axios.post('/tasks/create', {
      desc: taskDesc,
      age: taskAge,
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
    axios.delete('/tasks/delete', {
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
              <Button type="primary" htmlType="submit" >Add customer</Button>
            </Form.Item>
            <Form.Item name="task_desc">
              <Input.TextArea style={{ width: '400px' }} placeholder='Name' autoSize={true} />
            </Form.Item>
            <Form.Item name="task_age">
              <Input.TextArea style={{ width: '400px' }} placeholder='Age' autoSize={true} />
            </Form.Item>
            <Form.Item name="task_location">
              <Input.TextArea style={{ width: '400px' }} placeholder='Location' autoSize={true} />
            </Form.Item>
          </Space>
        </Form>
      </Space>
    );
  }

  return (
    <div className="App">
      {messageContextHolder}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <Typography.Title level={1}>Database Project</Typography.Title>

      <List
        style={{ width: '800px' }}
        bordered={true}
        footer={<TaskAdder />}
        dataSource={tasksList}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button icon={<DeleteOutlined />} onClick={() => { deleteTask(item.id) }} />
            ]}
          >
            <Tooltip title="ID" color={'#1890ff'}>
              <Badge count={item.id}></Badge>
            </Tooltip>
            <Tooltip title="Name, Age, Location" color={'#1890ff'}>
              <Input.TextArea bordered={false} value={`${item.desc}, ${item.age}, ${item.location}`} autoSize={true} />
            </Tooltip>
          </List.Item>
        )}
      />
    </div>
  )
}

export default App