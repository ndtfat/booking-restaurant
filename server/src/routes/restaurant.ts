import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import restaurantController from '../controllers/restaurantController';

const router = Router();

router.get('/suggest', verifyToken, restaurantController.getSuggest);
router.get('/:id', verifyToken, restaurantController.getInfo);

export default router;
