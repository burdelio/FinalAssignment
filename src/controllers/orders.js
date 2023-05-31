import { getAllOrders, createOrder, deleteOrder } from "../services/orders.js";

// handlers
const getAll = async (req, res) => {
    const data = await getAllOrders();
    res.send(data);
}

const create = async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const paymentType = req.body.paymentType;
    const executionDate = req.body.executionDate;
    const isOnline = req.body.isOnline;
    const area = req.body.area;
    const driver = req.body.driver;
    try {
        const data = await createOrder(name, price, paymentType, executionDate, isOnline, area, driver);
        res.send(data);
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteOne = async (req, res) => {
    const id = req.body.id;

    try {
        if (!Number.isInteger(id)) {
            throw 'Wrong id number';
        }
        const result = await deleteOrder(id);
        res.send({ removed: result });
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

export { create, getAll, deleteOne }