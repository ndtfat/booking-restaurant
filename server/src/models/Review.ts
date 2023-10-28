import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ReviewSchema = new Schema(
    {
        rate: { type: Object, required: true },
        content: { type: String, require: true },
        clientId: { type: String, required: true, ref: 'users' },
        restaurantId: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('reviews', ReviewSchema);
