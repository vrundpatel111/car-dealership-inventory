import request from 'supertest';
import { app } from '../app';

describe('Auth API', () => {
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
      expect(res.body).toHaveProperty('id');
      expect(res.body.email).toEqual('test@example.com');
      // Ensure password is never returned
      expect(res.body).not.toHaveProperty('password');
    });
  });
});
