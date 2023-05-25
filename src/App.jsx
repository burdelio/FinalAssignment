import { useState } from 'react'
import { Button, Checkbox, Input, List, Typography, Space, Form, message, Badge, Tooltip, Select } from 'antd'
import { DeleteOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { useLoaderData } from 'react-router-dom';

import './App.css'
import axios from 'axios';
import options from './configs/menu';
import orderMethod from './configs/orderMethod';
import delivery from './configs/delivery';

const App = () => {
  const [tasksList, setTasksList] = useState(useLoaderData().data)
  const [newTaskForm] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [onlineOrder, setOnlineOrder] = useState(false);

  const optionChecked = (e) => {
    setOnlineOrder(e.target.checked);
  }

  const addNewTask = (values) => {
    const taskDesc = values.task_desc;
    const taskAge = values.task_age;
    const taskGender = values.task_gender;
    const taskLocation = values.task_location;

    if (!taskDesc || !taskAge || !taskLocation || !taskGender) {
      return;
    }

    newTaskForm.resetFields();

    axios.post('/tasks/create', {
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

  const OrderAdder = () => {
    return (
      <Space>
        <Form
          // name="new_task_form"
          // form={newTaskForm}
          layout="inline"
        // onFinish={addNewTask} // dodac funkcje do dodania orderu
        >
          <Space direction="vertical" size={8} align='center'>
            <Form.Item name="add_order">
              <Button type="primary" htmlType="submit" >Order</Button>
            </Form.Item>
            <Form.Item name="task_desc">
              <Select options={options}
                style={{ width: '400px', textAlign: 'left' }}
                placeholder='Name'
              ></Select>
            </Form.Item>
            <Form.Item name="task_price">
              <Input style={{ width: '400px' }} placeholder={'Price'} autoSize={true} disabled={true} />
            </Form.Item>
            <Form.Item name="task_PM">
              <Select options={orderMethod} style={{ width: '400px', textAlign: 'left' }} placeholder='Payment type' ></Select>
            </Form.Item>
            <Form.Item>
              <Checkbox checked={onlineOrder} style={{ width: '400px', textAlign: 'left' }} onChange={optionChecked}>
                Online Order
                {onlineOrder &&
                  <Space direction="vertical" size={8} align='center'>
                    <Form.Item>
                      <Input style={{ width: '377px', textAlign: 'left' }} placeholder={'Area'} autoSize={true}></Input>
                    </Form.Item>
                    <Form.Item>
                      <Select options={delivery} style={{ width: '377px', textAlign: 'left' }} placeholder='Select Deliver' ></Select>
                    </Form.Item>
                  </Space>
                }
              </Checkbox>
            </Form.Item>
          </Space>
        </Form >
      </Space >
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

      <Space direction="vertical" size={16}>
        <Space wrap size={16}>
          <List
            style={{ width: '500px' }}
            bordered={true}
            footer={<OrderAdder />}
            //dataSource={tasksList}
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
                  <Input.TextArea bordered={false} value={``} autoSize={true} />
                </Tooltip>
              </List.Item>
            )}
          />

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
      </Space>
    </div>
  )
}

export default App