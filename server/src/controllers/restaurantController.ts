import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';
import Review from '../models/Review';

class RestaurantController {
    // [GET] /restaurant/:id
    async getInfo(req: Request, res: Response) {
        try {
            const restaurantId = req.params.id;
            const restaurant = await Restaurant.findById(restaurantId);
            const reviews = await Review.find({ restaurantId });
            return res.status(200).json({ message: 'Get restaurant info successfully', data: restaurant });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    // [GET] /restaurant/suggest
    async getSuggest(req: Request, res: Response) {
        try {
            const restaurants = await Restaurant.find({}).sort({ rate: 'desc' }).limit(4);
            res.status(200).json({ message: 'Get restaurants successfully', data: restaurants });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

export default new RestaurantController();
