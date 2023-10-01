import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import connectDB from './config/connectDB';

const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

routes(app);

app.listen(4100, () => {
    console.log('listening on port 4100');
});
