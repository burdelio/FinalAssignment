import { db } from "../models/index.js"
import { DataTypes } from 'sequelize';

const Order = db.define('orders', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    paymentType: DataTypes.STRING,
    isOnline: DataTypes.BOOLEAN,
    area: DataTypes.STRING,
    driver: DataTypes.STRING
});

export default Order