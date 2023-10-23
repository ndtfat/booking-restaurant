import { Express } from 'express';
import authRouter from './auth';
import userRouter from './user';
import restaurantRouter from './restaurant';

export default (app: Express) => {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/restaurant', restaurantRouter);
};
