import authController from '../controllers/authController';

const router = require('express').Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refreshToken', authController.refreshToken);

export default router;
