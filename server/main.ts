import express from 'express';
import dotenv from 'dotenv';
import getUsersHandler from './modules/user.ts';

dotenv.config();

const app = express();

app.get("/students", getUsersHandler);

app.listen(process.env.API_PORT, () => console.log(`api listen ${process.env.API_PORT}.`));