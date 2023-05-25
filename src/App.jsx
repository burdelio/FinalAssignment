import { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Button, Input, List, Typography, Space, Form, message, Badge, Tooltip } from 'antd';
import { DeleteOutlined, HomeOutlined, PieChartOutlined, UserOutlined, TeamOutlined, DesktopOutlined } from '@ant-design/icons';
import { Link, Outlet, useLoaderData } from 'react-router-dom';

import './App.css'
import axios from 'axios';

const { Header, Content, Sider } = Layout;

const items = [
  { key: 1, label: (<Link to='/'>Home</Link>), icon: <HomeOutlined /> },
  { key: 2, label: (<Link to='customers'>Customers</Link>), icon: <UserOutlined /> },
  { key: 3, label: (<Link to='orders'>Orders</Link>), icon: <UserOutlined /> },
];

const App = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const [tasksList, setTasksList] = useState(useLoaderData().data)
  const [newTaskForm] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={menuCollapsed} onCollapse={(value) => setMenuCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content className='content'>
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="App">
            {messageContextHolder}
            <div>
              <a href="https://vitejs.dev" target="_blank" rel='noreferrer'>
                <img src="/vite.svg" className="logo" alt="Vite logo" />
              </a>
            </div>
            <Typography.Title level={1}>Database Project</Typography.Title>

            <Outlet />
            <Space wrap size={16}>
              <List
                style={{ width: '500px' }}
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
                      <Input.TextArea bordered={false} value={`${item.desc}, ${item.age}, ${item.gender}, ${item.location}`} autoSize={true} />
                    </Tooltip>
                  </List.Item>
                )}
              />
            </Space>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;