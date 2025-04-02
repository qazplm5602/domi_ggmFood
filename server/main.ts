import express from 'express';
import dotenv from 'dotenv';
import getUsersHandler from './modules/user.ts';
import { getAlreadyRating, writeFoodRating } from './modules/rating.ts';

dotenv.config();

const app = express();
app.use(express.json());

app.get("/students", getUsersHandler);
app.post("/rating", writeFoodRating)
app.get("/rating", getAlreadyRating)

app.listen(process.env.API_PORT, () => console.log(`api listen ${process.env.API_PORT}.`));