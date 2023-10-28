import { Request, Response } from 'express';
import Reservation from '../models/Reservation';
import Restaurant from '../models/Restaurant';
import Review from '../models/Review';

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
}

export default new UserController();
