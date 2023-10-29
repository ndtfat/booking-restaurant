import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';
import Review from '../models/Review';

class RestaurantController {
    // [GET] /restaurant/:id
    async getInfo(req: Request, res: Response) {
        try {
            const restaurantId = req.params.id;
            const restaurant = await Restaurant.findById(restaurantId);
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

    // [GET] /restaurant/:restaurantId/getReview/:userId?sortBy=
    async getReview(req: Request, res: Response) {
        try {
            const sort = req.query.sortBy === 'asc' ? 1 : -1;
            let limit = Number(req.query.limit) || 5;

            if (limit < 0) {
                limit = 5;
            }

            const clientId = req.params.clientId;
            const restaurantId = req.params.restaurantId;
            const reviews = await Review.find({ restaurantId, clientId: { $ne: clientId } })
                .populate('clientId', 'username')
                .sort({ createdAt: sort })
                .limit(limit);
            const clientReview = await Review.findOne({ restaurantId, clientId }).populate('clientId', 'username');
            const numberOfReviews = await Review.find({ restaurantId, clientId: { $ne: clientId } }).count();

            res.status(200).json({
                message: 'Get reviews successfully',
                data: { yourReview: clientReview, reviews, numberOfReviews },
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

export default new RestaurantController();
