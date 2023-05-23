import { db } from "../models/index.js"
import { DataTypes } from 'sequelize';

const Task = db.define('tasks', {
    desc: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    location: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
});

export default Task