import { Request, Response } from 'express';
import Reservation from '../models/Reservation';

class UserController {
    // [POST] /user/booking/:restaurantId
    async booking(req: Request, res: Response) {
        try {
            const payload = req.body;
            const restaurantId = req.params.restaurantId;
            const newReservation = await Reservation.create({ ...payload, restaurantId });
            res.status(200).json({ message: 'Booking successful', data: newReservation });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

export default new UserController();
