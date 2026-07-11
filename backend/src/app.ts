import express from 'express';
import { authRouter } from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';

export const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);

app.use(errorHandler);
