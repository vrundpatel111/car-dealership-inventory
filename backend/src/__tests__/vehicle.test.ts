import request from 'supertest';
import { app } from '../app';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('Vehicle API', () => {
  let userToken: string;
  let adminToken: string;
  let vehicleId: number;

  beforeAll(async () => {
    await prisma.vehicle.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
      data: { email: 'user2@example.com', password: 'hash', name: 'User', role: 'USER' }
    });
    const admin = await prisma.user.create({
      data: { email: 'admin2@example.com', password: 'hash', name: 'Admin', role: 'ADMIN' }
    });

    userToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    adminToken = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  });

  describe('POST /api/vehicles', () => {
    it('should allow admin to add a vehicle', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ make: 'Toyota', model: 'Camry', category: 'Sedan', price: 25000, quantity: 2 });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.make).toEqual('Toyota');
      vehicleId = res.body.id;
    });

    it('should block non-admins from adding a vehicle', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ make: 'Honda', model: 'Civic', category: 'Sedan', price: 20000 });
      
      expect(res.statusCode).toEqual(403);
    });
  });

  describe('GET /api/vehicles', () => {
    it('should return all vehicles', async () => {
      const res = await request(app)
        .get('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/vehicles/search', () => {
    it('should filter vehicles by make', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?make=Toyota')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.every((v: any) => v.make.toLowerCase().includes('toyota'))).toBe(true);
    });

    it('should filter vehicles by category', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?category=Sedan')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.every((v: any) => v.category.toLowerCase().includes('sedan'))).toBe(true);
    });

    it('should filter vehicles by price range', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?minPrice=20000&maxPrice=30000')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.every((v: any) => v.price >= 20000 && v.price <= 30000)).toBe(true);
    });
  });

  describe('POST /api/vehicles/:id/purchase', () => {
    it('should allow a user to purchase and decrement quantity', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.quantity).toEqual(1);
    });
  });

  describe('POST /api/vehicles/:id/restock', () => {
    it('should allow admin to restock', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ amount: 5 });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.quantity).toEqual(6);
    });
  });
});
