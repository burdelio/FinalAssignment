import { useState } from 'react'
import { Button, Checkbox, Input, List, Typography, Space, Form, message } from 'antd'
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

    if (!taskDesc) {
      return;
    }

    newTaskForm.resetFields();

    axios.post('/tasks/create', {
      desc: taskDesc
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
        <PlusCircleTwoTone />
        <Form
          name="new_task_form"
          form={newTaskForm}
          layout="inline"
          onFinish={addNewTask}
        >
          <Form.Item name="task_desc">
            <Input.TextArea style={{ width: '400px' }} placeholder='New task' autoSize={true} />
          </Form.Item>
          <Form.Item name="add_task">
            <Button type="primary" htmlType="submit">Add</Button>
          </Form.Item>
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
      <Typography.Title level={1}>2DO LIST</Typography.Title>

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
            <Checkbox checked={item.done} />
            <Input.TextArea bordered={false} value={item.desc} autoSize={true} />
          </List.Item>
        )}
      />
    </div>
  )
}

export default App
