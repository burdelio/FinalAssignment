import { Router } from 'express';
import { create, getAll, deleteOne } from '../controllers/orders.js';

const router = Router();

router.get('/all', getAll)
router.post('/create', create)
router.delete('/delete', deleteOne)

export default router;