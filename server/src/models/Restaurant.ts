import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const RestaurantSchema = new Schema({
    ownerId: { type: String, required: true },
    name: { type: String, required: true },
    photos: { type: Array, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    menu: { type: Array, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    rate: { type: Number, required: true, default: 0 },
});

export default mongoose.model('restaurants', RestaurantSchema);
