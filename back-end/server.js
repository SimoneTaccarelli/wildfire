import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import authRoutes from './routes/auth.js';


dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.use('/api/v1/auth', authRoutes);


admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)),
});

mongoose.connect(process.env.MONGODB_URI, {})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});