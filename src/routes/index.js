import { Router } from "express";

import tasks from './tasks.js'
import orders from './orders.js'

const router = Router();

router.use('/tasks', tasks);
router.use('/orders', orders);

export default router;