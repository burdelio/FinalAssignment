import { useState } from 'react';
import { Button, Checkbox, Input, Space, Form, Select, message } from 'antd';
import { useLoaderData } from 'react-router-dom';

import options from '../../configs/menu';
import orderMethod from '../../configs/orderMethod';
import delivery from '../../configs/delivery';

import axios from 'axios';
import DynamicTableContent from '../../components/DynamicTable/DynamicTableContent';

const Orders = () => {
    const [onlineOrder, setOnlineOrder] = useState(false);
    const [area, setArea] = useState('');

    const optionChecked = (e) => {
        setOnlineOrder(e.target.checked);
    }

    const [premium, setPremium] = useState(false);

    const checkPremium = (e) => {
        setPremium(e.target.checked);
    }

    const [newOrderForm] = Form.useForm();
    const [OrdersList, setOrdersList] = useState(useLoaderData()?.data || []);
    const [messageApi, messageContextHolder] = message.useMessage();

    const foodPick = () => {
        const selectedLabel = newOrderForm.getFieldValue('Order_name');
        const selectedOption = options.find(option => option.label === selectedLabel);
        console.log(selectedOption);
        if (selectedOption) {
            const selectedPrice = selectedOption.price;
            newOrderForm.setFieldValue('Order_price', selectedPrice)
        }
    };

    const addNewOrder = (values) => {
        const OrderName = values.Order_name;
        let OrderPrice = values.Order_price;
        const OrderPT = values.Order_PT;
        const executionDate = new Date();
        const OrderP = premium;
        const OrderIO = onlineOrder;
        const OrderArea = values.Order_area;
        const OrderDriver = values.Order_driver;
        console.log(OrderP);

        if (!OrderName || !OrderPrice || !OrderPT) {
            return;
        }
        if (OrderIO === true) {
            if (!OrderArea || !OrderDriver) {
                return;
            }
        }
        if (OrderP === true) {
            OrderPrice = OrderPrice * 0.9;
        }

        newOrderForm.resetFields();

        axios.post('/api/orders/create', {
            name: OrderName,
            price: OrderPrice,
            paymentType: OrderPT,
            executionDate: executionDate,
            isPremium: OrderP,
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
                            <Select onChange={foodPick} style={{ width: '400px', textAlign: 'left' }} placeholder='Name'>
                                {options.map(option => (
                                    <Select.Option key={option.label} value={option.label}>
                                        {option.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="Order_price">
                            <Input style={{ width: '400px' }} placeholder={'Price'} autoSize disabled />
                        </Form.Item>
                        <Form.Item name="Order_PT">
                            <Select options={orderMethod} style={{ width: '400px', textAlign: 'left' }} placeholder='Payment type' ></Select>
                        </Form.Item>
                        <Form.Item>
                            <Checkbox name="Order_P" checked={premium} style={{ width: '400px', textAlign: 'left' }} onChange={checkPremium}>
                                Premium
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Checkbox name="Order_IO" checked={onlineOrder} style={{ width: '400px', textAlign: 'left' }} onChange={optionChecked}>
                                Online Order
                            </Checkbox>
                        </Form.Item>
                        {onlineOrder &&
                            <Space direction="vertical" size={8} align='center'>
                                <Form.Item name="Order_area">
                                    <Input
                                        style={{ width: '377px', textAlign: 'left' }}
                                        placeholder={'Area'}
                                        autoSize={true}
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item name="Order_driver">
                                    <Select
                                        style={{ width: '377px', textAlign: 'left' }}
                                        placeholder='Select Deliver'
                                    >
                                        {delivery
                                            .filter((delivery) => delivery.area == area.trim())
                                            .map((option) => (
                                                <Select.Option key={option.ID} value={option.ID}>
                                                    {option.label}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Space>
                        }
                    </Space>
                </Form >
            </Space >
        );
    };

    const OrderColumns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
        },
        {
            title: "Name",
            width: 150,
            dataIndex: "name",
            align: "center",
            editable: true,
        },
        {
            title: "Price",
            with: 100,
            dataIndex: "price",
            align: "center",
        },
        {
            title: "Payment",
            width: 125,
            dataIndex: "paymentType",
            align: "center",
            editable: true,
        },
        {
            title: "Date",
            width: 200,
            dataIndex: "executionDate",
            align: "center",
            render: (text) => {
                const executionDate = new Date(text);
                return executionDate.toLocaleString();
            },
        },
        {
            title: "Premium",
            dataIndex: "isPremium",
            align: "center",
            type: 'bool',
        },
        {
            title: "Online",
            dataIndex: "isOnline",
            align: "center",
            type: 'bool',
        },
        {
            title: "Area",
            dataIndex: "area",
            align: "center",
        },
        {
            title: "Driver",
            width: 150,
            dataIndex: "driver",
            align: "center",
            render: (text) => {
                if (text) {
                    const driver = delivery.find((delivery) => delivery.ID == text)
                    return driver.label;
                } else {
                    return '';
                }
            }
        },
    ];
    return (<Space direction='vertical' size='large'>
        <DynamicTableContent
            dataSource={OrdersList}
            columns={OrderColumns}
            handleCellSave={() => { }}
        />
        <OrderAdder />
    </Space>);
}

export default Orders;