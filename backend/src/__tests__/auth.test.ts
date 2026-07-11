import request from 'supertest';
import { app } from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Auth API', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });
  describe('POST /api/auth/register', () => {
    it('should register a new user and return 201', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toEqual('test@example.com');
      // Ensure password is never returned
      expect(res.body.user).not.toHaveProperty('password');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a user and return a JWT token', async () => {
      await request(app).post('/api/auth/register').send({
        email: 'login@example.com',
        password: 'password123',
        name: 'Login User'
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('id');
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toEqual(401);
    });
  });
});
