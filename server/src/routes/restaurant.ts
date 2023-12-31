import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import restaurantController from '../controllers/restaurantController';

const router = Router();

router.get('/suggest', restaurantController.getSuggest);
router.get('/:restaurantId/get-review/:clientId', restaurantController.getReview);
router.get('/:id', restaurantController.getInfo);

export default router;
