import { Express } from 'express';
import authRouter from './auth';
import userRouter from './user';

export default (app: Express) => {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
};
