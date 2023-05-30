import { useState } from 'react';
import { Button, Checkbox, Input, Space, Form, Select, List, Tooltip, Badge, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useLoaderData } from 'react-router-dom';

import options from '../../configs/menu';
import orderMethod from '../../configs/orderMethod';
import delivery from '../../configs/delivery';

import axios from 'axios';

const Orders = () => {
    const [onlineOrder, setOnlineOrder] = useState(false);

    const optionChecked = (e) => {
        setOnlineOrder(e.target.checked);
    }

    const [newOrderForm] = Form.useForm();
    const [OrdersList, setOrdersList] = useState(useLoaderData()?.data || []);
    const [messageApi, messageContextHolder] = message.useMessage();

    const addNewOrder = (values) => {
        const OrderName = values.Order_name;
        const OrderPrice = values.Order_price;
        const OrderPT = values.Order_PT;
        const OrderIO = values.Order_IO;
        const OrderArea = values.Order_area;
        const OrderDriver = values.Order_driver;

        // if (!OrderName || !OrderPrice || !OrderPT) {
        //     return;
        // }

        newOrderForm.resetFields();

        axios.post('/api/orders/create', {
            name: OrderName,
            price: OrderPrice,
            paymentType: OrderPT,
            isOnline: OrderIO,
            area: OrderArea,
            driver: OrderDriver
        }
        ).then((res) => {
            setOrdersList((currentOrdersList) => {
                const newOrdersList = [...currentOrdersList, res.data];
                return newOrdersList;
            });
        });
    }

    const deleteOrder = (id) => {
        axios.delete('/api/Orders/delete', {
            data: { id: id }
        }).then((res) => {
            if (!res.data.removed) {
                messageApi.open({
                    type: 'error',
                    content: 'Cannot remove picked Order'
                });
                return;
            }

            setOrdersList((currentOrdersList) => {
                const OrdersList = [...currentOrdersList];
                const OrdersListDeleted = OrdersList.filter(Order => Order.id !== id);
                return OrdersListDeleted;
            });
        })
    }

    const OrderAdder = () => {
        return (
            <Space>
                <Form
                    name="new_Order_form"
                    form={newOrderForm}
                    layout="inline"
                    onFinish={addNewOrder} // dodac funkcje do dodania orderu
                >
                    <Space direction="vertical" size={8} align='center'>
                        <Form.Item name="add_order">
                            <Button type="primary" htmlType="submit" >Order</Button>
                        </Form.Item>
                        <Form.Item name="Order_name">
                            <Select options={options}
                                style={{ width: '400px', textAlign: 'left' }}
                                placeholder='Name'
                            ></Select>
                        </Form.Item>
                        <Form.Item name="Order_price">
                            <Input style={{ width: '400px' }} placeholder={'Price'} autoSize={true} disabled={true} />
                        </Form.Item>
                        <Form.Item name="Order_PT">
                            <Select options={orderMethod} style={{ width: '400px', textAlign: 'left' }} placeholder='Payment type' ></Select>
                        </Form.Item>
                        <Form.Item>
                            <Checkbox name="Order_IO" checked={onlineOrder} style={{ width: '400px', textAlign: 'left' }} onChange={optionChecked}>
                                Online Order
                                {onlineOrder &&
                                    <Space direction="vertical" size={8} align='center'>
                                        <Form.Item name="Order_area">
                                            <Input style={{ width: '377px', textAlign: 'left' }} placeholder={'Area'} autoSize={true}></Input>
                                        </Form.Item>
                                        <Form.Item name="Order_driver">
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

    return (<List
        style={{ width: '500px' }}
        bordered={true}
        footer={<OrderAdder />}
        dataSource={OrdersList}
        renderItem={(item) => (
            <List.Item
                key={item.id}
                actions={[
                    <Button icon={<DeleteOutlined />} onClick={() => { deleteOrder(item.id) }} />
                ]}
            >
                <Tooltip title="ID" color={'#1890ff'}>
                    <Badge count={item.id}></Badge>
                </Tooltip>
                <Tooltip title="Name, Price, Payment Type, Is Order Online, Area, Driver" color={'#1890ff'}>
                    <Input.TextArea bordered={false} value={`${item.name}, ${item.price}, ${item.paymentType}, ${item.isOnline}, ${item.area}, ${item.driver}`} autoSize={true} />
                </Tooltip>
            </List.Item>
        )}
    />);
}

export default Orders;