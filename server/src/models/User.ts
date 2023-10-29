import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isRestaurantOwner: { type: Boolean, required: true, default: false },
    savedRestaurants: { type: Array, required: true, default: [] },
});

export default mongoose.model('users', UserSchema);
