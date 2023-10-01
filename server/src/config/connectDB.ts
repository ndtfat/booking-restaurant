import mongoose from 'mongoose';

export default () => {
    mongoose.connect(process.env.MONGODB_URL as string).then(() => {
        console.log('Connected to Mongo');
    });
};
