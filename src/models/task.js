import { db } from "../models/index.js"
import { DataTypes } from 'sequelize';

const Task = db.define('tasks', {
    desc: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
});

export default Task