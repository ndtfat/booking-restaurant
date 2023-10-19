import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/booking', userController.booking);
router.post('/review', verifyToken, userController.review);

export default router;
