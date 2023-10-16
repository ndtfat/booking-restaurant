import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/booking', userController.booking);
router.post('/review', userController.review);

export default router;
