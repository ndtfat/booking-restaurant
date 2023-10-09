import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';
import connectDB from './config/connectDB';
import './config/passport';

const app: Express = express();
dotenv.config();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

routes(app);

app.listen(4100, () => {
    console.log('listening on port 4100');
});
