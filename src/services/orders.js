import Order from "../models/order.js"

const getAllOrders = async () => {
    const data = await Order.findAll();
    return data;
}

const createOrder = async (iName, iPrice, iPaymentType, iExecutionDate, iIsPremium, iIsOnline, iArea, iDriver) => {
    const order = {
        name: iName,
        price: iPrice,
        paymentType: iPaymentType,
        executionDate: iExecutionDate,
        isPremium: iIsPremium,
        isOnline: iIsOnline,
        area: iArea,
        driver: iDriver
    }

    try {
        const data = await Order.create(order);
        return data;
    } catch (err) {
        throw err.message || 'Unknown error occured during Order creation'
    }
}

const deleteOrder = async (id) => {
    try {
        const result = await Order.destroy({
            where: { id: id }
        });
        return Boolean(result);
    } catch (err) {
        throw err.message || 'Unknown error occured during Order deletion'
    }
}

export { createOrder, getAllOrders, deleteOrder }