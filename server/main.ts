import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();



app.listen(process.env.API_PORT, () => console.log(`api listen ${process.env.API_PORT}.`));