import express from 'express';
import { authRouter } from './routes/auth.routes';
import { vehicleRouter } from './routes/vehicle.routes';
import { errorHandler } from './middlewares/error.middleware';

export const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/vehicles', vehicleRouter);

app.use(errorHandler);
