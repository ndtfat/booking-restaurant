import { Request, Response } from 'express';
import Reservation from '../models/Reservation';
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
            const newReivew = await Review.create(payload);
            res.status(200).json({ message: 'Review successful', data: newReivew });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

export default new UserController();
