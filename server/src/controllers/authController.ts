import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Token from '../models/Token';

const generateAccessToken = (data: any) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_KEY as string, {
        expiresIn: '1d',
    });
};

const generateRefreshToken = (data: any) => {
    return jwt.sign(data, process.env.REFRESH_TOKEN_KEY as string, {
        expiresIn: '30s',
    });
};

class AuthController {
    // [POST] /auth/register
    async register(req: Request, res: Response) {
        try {
            const payload = req.body;
            const encodedPassword = await bcrypt.hash(payload.password, 10);
            const newUser = new User({ ...payload, password: encodedPassword });
            await newUser.save();

            return res.status(200).json({ message: 'Registration successful' });
        } catch (error: any) {
            if (error.code && error.code === 11000) {
                return res.status(403).json({
                    message: 'Registration failed',
                    error: error.keyPattern['email']
                        ? 'Email already in use'
                        : 'Username already in use',
                });
            } else
                return res.status(500).json({ message: 'Server error', error });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const payload = req.body;
            const user = await User.findOne({ email: payload.email });

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const isValidPassword = await bcrypt.compare(
                payload.password,
                user.password,
            );

            if (isValidPassword) {
                const safeData = {
                    id: user.id,
                    email: user.email,
                    isRestaurantOWner: user.isRestaurantOwner,
                };
                const accessToken = generateAccessToken(safeData);
                const refreshToken = generateRefreshToken(safeData);

                const userToken = await Token.findOneAndUpdate(
                    { userId: user.id },
                    { accessToken, refreshToken },
                );

                if (!userToken) {
                    await Token.create({
                        userId: user.id,
                        accessToken,
                        refreshToken,
                    });
                }

                return res.status(200).json({
                    message: 'Login successful',
                    data: { ...safeData, accessToken, refreshToken },
                });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            await Token.deleteOne({ userId: req.body.userId });
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const userId = req.body.userId;
            const user = await User.findOne({ _id: userId });
            const userToken = await Token.findOne({ userId });

            // check user existence
            if (!user)
                return res.status(401).json({ message: 'User not found' });

            const safeData = {
                id: user.id,
                email: user.email,
                isRestaurantOWner: user.isRestaurantOwner,
            };

            // check token existence
            if (!userToken) {
                return res.status(401).json({
                    message: 'Token not found',
                });
            }

            // check token expiration
            await jwt.verify(
                userToken.refreshToken,
                process.env.REFRESH_TOKEN_KEY as string,
            );

            const newAccessToken = await generateAccessToken(safeData);
            return res.status(200).json({
                message: 'Refresh token successfully',
                data: { ...safeData, accessToken: newAccessToken },
            });
        } catch (error: any) {
            if (error['name'] === 'TokenExpiredError') {
                return res
                    .status(401)
                    .json({ message: 'Token expired! Please log in', error });
            } else
                return res.status(500).json({ message: 'Server error', error });
        }
    }
}

export default new AuthController();