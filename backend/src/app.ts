import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes';
import { vehicleRouter } from './routes/vehicle.routes';
import { errorHandler } from './middlewares/error.middleware';

export const app = express();

// Allow requests from the deployed frontend (set FRONTEND_URL on Railway)
// Falls back to all origins in local development
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/vehicles', vehicleRouter);

app.use(errorHandler);
