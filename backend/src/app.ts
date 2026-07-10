import express from 'express';

export const app = express();
app.use(express.json());

app.post('/api/auth/register', (req, res) => {
  res.status(201).json({
    id: 1,
    email: req.body.email,
    name: req.body.name
  });
});
