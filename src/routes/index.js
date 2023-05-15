import { Router } from "express";

import tasks from './tasks.js'

const router = Router();

router.use('/tasks', tasks);

export default router;