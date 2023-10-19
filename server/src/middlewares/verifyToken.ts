import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const authentication: any = req.headers.authentication;
    if (authentication) {
        const token = authentication.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string, (err: any, user: any) => {
            if (err) return res.status(401).json({ message: 'Invalid Access Token', err });
            else {
                req.user = user;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'You are not logged in' });
    }
};
