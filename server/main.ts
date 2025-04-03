import express from 'express';
import dotenv from 'dotenv';
import getUsersHandler from './modules/user.ts';
import { getAlreadyRating, getDetailRating, updateFoodRating, writeFoodRating } from './modules/rating.ts';

dotenv.config();

const app = express();
app.use(express.json());

app.get("/students", getUsersHandler);
app.get("/rating", getAlreadyRating)
app.get("/rating/detail", getDetailRating)
app.post("/rating", writeFoodRating)
app.put("/rating", updateFoodRating)

app.listen(process.env.API_PORT, () => console.log(`api listen ${process.env.API_PORT}.`));