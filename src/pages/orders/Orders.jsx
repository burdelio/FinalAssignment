import { useState } from 'react';
import { Button, Checkbox, Input, Space, Form, Select, List, Tooltip, Badge } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import options from '../../configs/menu';
import orderMethod from '../../configs/orderMethod';
import delivery from '../../configs/delivery';

const OrderAdder = () => {
    const [onlineOrder, setOnlineOrder] = useState(false);

    const optionChecked = (e) => {
        setOnlineOrder(e.target.checked);
    }

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
};

const Orders = () => {
    const deleteTask = (id) => {
        return true;
    };

    return (<List
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
    />);
}

export default Orders;