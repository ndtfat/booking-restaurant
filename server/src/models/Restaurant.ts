import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const RestaurantSchema = new Schema({
    ownerId: { type: String, required: true },
    rate: { type: Number, required: true, default: 0 },
    menu: { type: Array, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true, default: 'There is no description about this restaurant' },
    photos: { type: Array, required: true },
    address: { type: String, required: true },
    payments: { type: Array<String>, default: ['Cash'] },
    isActive: { type: Boolean, required: true, default: false },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    reservationSize: { type: Number, required: true },
});

export default mongoose.model('restaurants', RestaurantSchema);
