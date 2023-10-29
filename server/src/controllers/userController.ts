import { log } from 'console';
import { Request, Response } from 'express';
import Reservation from '../models/Reservation';
import Restaurant from '../models/Restaurant';
import Review from '../models/Review';
import User from '../models/User';

class UserController {
    // [POST] /user/booking/
    async booking(req: Request, res: Response) {
        try {
            const payload = req.body;
            const newReservation = await Reservation.create(payload);
            res.status(200).json({ message: 'Booking successful', data: newReservation });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    // [POST] /user/review
    async review(req: Request, res: Response) {
        try {
            const payload = req.body;
            const rate: {
                food: number;
                service: number;
                ambience: number;
            } = payload.rate;
            const userAverageRate = (rate.food + rate.service + rate.ambience) / 3;
            const totalRateOfRestaurant = await Review.find({ restaurantId: payload.restaurantId }).count();

            const restaurant = await Restaurant.findById(payload.restaurantId);
            if (!restaurant) return res.status(404).json({ message: 'Restaurant not found in database' });

            restaurant.rate = (restaurant.rate * totalRateOfRestaurant + userAverageRate) / (totalRateOfRestaurant + 1);
            restaurant.save();

            const newReivew = await Review.create(payload);

            res.status(200).json({ message: 'Review successful', data: newReivew });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    // [POST] /user/save
    async saveRestaurant(req: Request, res: Response) {
        try {
            const userId = req.body.userId;
            const restaurantId = req.body.restaurantId;
            const user = await User.findById(userId);

            if (user) {
                user.savedRestaurants.push(restaurantId);
                const modifiedUser = await user.save();

                return res
                    .status(200)
                    .json({
                        message: 'Restaurants saved successfully',
                        savedRestaurants: modifiedUser.savedRestaurants,
                    });
            }
            return res.status(404).json({ message: 'User not found' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    // [POST] /user/unsave
    async unsaveRestaurant(req: Request, res: Response) {
        try {
            const userId = req.body.userId;
            const restaurantId = req.body.restaurantId;
            const user = await User.findById(userId);

            if (user) {
                user.savedRestaurants = user.savedRestaurants.filter((id) => id !== restaurantId);
                const modifiedUser = await user.save();
                const safeData = {
                    id: modifiedUser.id,
                    email: modifiedUser.email,
                    isRestaurantOwner: modifiedUser.isRestaurantOwner,
                    savedRestaurants: modifiedUser.savedRestaurants,
                };
                return res.status(200).json({ message: 'Unsave restaurant successfully', user: safeData });
            }
            return res.status(404).json({ message: 'User not found' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

export default new UserController();
