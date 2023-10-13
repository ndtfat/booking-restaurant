import mongoose from 'mongoose';

export const state = {
    CANCELED: 'cancelled',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    UNCONFIRMED: 'unconfirmed',
};

const ReservationSchema = new mongoose.Schema({
    clientId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    state: { type: String, required: true, default: state.PROCESSING },
});

export default mongoose.model('reservations', ReservationSchema);
