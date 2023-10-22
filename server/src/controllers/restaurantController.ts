import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';

class RestaurantController {
    // [GET] /restaurant/:id
    async getInfo(req: Request, res: Response) {
        try {
            const restaurantId = req.params.id;
            const restaurant = await Restaurant.findOne({ id: restaurantId });
            return res.status(200).json({ message: 'Get restaurant info successfully', data: restaurant });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    // [GET] /restaurant/suggest
    async getSuggest(req: Request, res: Response) {
        try {
            const restaurants = await Restaurant.find({}).sort({ rate: 'desc' }).limit(8);
            res.status(200).json({ message: 'Get restaurants successfully', data: restaurants });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

export default new RestaurantController();
