import express from 'express';
import { register } from './controllers/auth.controller';

export const app = express();
app.use(express.json());

app.post('/api/auth/register', register);
