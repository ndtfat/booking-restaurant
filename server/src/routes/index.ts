import { Express } from 'express';
import authRouter from './auth';

export default (app: Express) => {
    app.use('/auth', authRouter);
};
