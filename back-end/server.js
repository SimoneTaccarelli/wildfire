import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { app } from 'firebase-admin';

dotenv.config();
app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.listen(process.env.BACKEND_URL || "http://localhost:8000", () => {
    console.log(`Server is running on ${process.env.BACKEND_URL || "http://localhost:8000"}`);
    });