import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    userId: { type: String, unique: true, required: true },
    accessToken: { type: String, unique: true, required: true },
    refreshToken: { type: String, unique: true, required: true },
});

export default mongoose.model('tokens', TokenSchema);
