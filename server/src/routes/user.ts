import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/booking/:restaurantId', userController.booking);

export default router;
