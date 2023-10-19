import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import Token from '../models/Token';
import passport from 'passport';
import Restaurant from '../models/Restaurant';

const generateAccessToken = (data: any) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_KEY as string, {
        expiresIn: '30s',
    });
};

const generateRefreshToken = (data: any) => {
    return jwt.sign(data, process.env.REFRESH_TOKEN_KEY as string, {
        expiresIn: '1m',
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
                    message: error.keyPattern['email'] ? 'Email already in use' : 'Username already in use',
                });
            } else return res.status(500).json({ message: 'Server error', error });
        }
    }

    // [POST] /auth/register-restaurant
    async registerRestaurant(req: Request, res: Response) {
        try {
            const ownerInfo = req.body.ownerInfo;
            const restaurantInfo = req.body.restaurantInfo;

            const encodedPassword = await bcrypt.hash(ownerInfo.password, 10);
            const newUser = new User({ ...ownerInfo, password: encodedPassword, isRestaurantOwner: true });
            const user = await newUser.save();

            const newRestaurant = new Restaurant({
                ...restaurantInfo,
                photos: [restaurantInfo.photo],
                ownerId: user.id,
            });
            const restaurant = await newRestaurant.save();

            return res.status(200).json({
                message: 'Restaurant is registered successfully',
            });
        } catch (error: any) {
            if (error.code && error.code === 11000) {
                return res.status(403).json({
                    message: error.keyPattern['email'] ? 'Email already in use' : 'Username already in use',
                });
            } else return res.status(500).json({ message: 'Server error', error });
        }
    }

    // [POST] /auth/login
    async login(req: Request, res: Response) {
        try {
            const payload = req.body;
            const user = await User.findOne({ email: payload.email });

            if (!user) return res.status(401).json({ message: 'Email not found' });

            const isValidPassword = await bcrypt.compare(payload.password, user.password);

            if (!isValidPassword) return res.status(401).json({ message: 'Your password is incorrect' });

            // isValidPassword
            const safeData = {
                id: user.id,
                email: user.email,
                isRestaurantOWner: user.isRestaurantOwner,
            };
            const accessToken = generateAccessToken(safeData);
            const refreshToken = generateRefreshToken(safeData);

            const userToken = await Token.findOneAndUpdate({ userId: user.id }, { accessToken, refreshToken });

            if (!userToken) {
                await Token.create({
                    userId: user.id,
                    accessToken,
                    refreshToken,
                });
            }

            // check user is restaurant owner
            let restaurant = null;
            if (user.isRestaurantOwner) {
                restaurant = await Restaurant.findOne({ ownerId: user.id });
            }

            return res.status(200).json({
                message: 'Login successful',
                data: { user: { ...safeData, accessToken, refreshToken }, restaurant },
            });
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    }

    // [POST] /auth/logout
    async logout(req: Request, res: Response) {
        try {
            await Token.deleteOne({ userId: req.body.userId });
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    }

    // [POST] /auth/refreshToken
    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.body.refreshToken;
            const userId = req.body.userId;
            const user = await User.findOne({ _id: userId });

            // check user existence
            if (!user) return res.status(401).json({ message: 'Please log in' });

            const safeData = {
                id: user.id,
                email: user.email,
                isRestaurantOWner: user.isRestaurantOwner,
            };

            // check token existence
            if (!refreshToken) {
                return res.status(401).json({
                    message: 'Missing refresh token in request',
                });
            }

            // check token expiration
            await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY as string);

            const newAccessToken = await generateAccessToken(safeData);
            return res.status(200).json({
                message: 'Refresh token successfully',
                data: newAccessToken,
            });
        } catch (error: any) {
            if (error['name'] === 'TokenExpiredError') {
                console.log('token expired');

                return res.status(401).json({ message: 'Refresh Token expired! Please log in', error });
            } else return res.status(500).json({ message: 'Server error', error });
        }
    }
}

export default new AuthController();
