import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/booking', verifyToken, userController.booking);
router.post('/review', verifyToken, userController.review);
router.post('/save-restaurant', verifyToken, userController.saveRestaurant);
router.post('/unsave-restaurant', verifyToken, userController.unsaveRestaurant);

export default router;
