import { Sequelize } from 'sequelize'
import dbConfig from '../configs/db.js'

const db = new Sequelize(dbConfig);

export {db, Sequelize}