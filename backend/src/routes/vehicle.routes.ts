import { Router } from 'express';
import { getAll, search, create, update, remove, purchase, restock } from '../controllers/vehicle.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

export const vehicleRouter = Router();

// All vehicle routes require authentication
vehicleRouter.use(authenticateJWT);

vehicleRouter.get('/', getAll);
vehicleRouter.get('/search', search); // MUST be before /:id routes
vehicleRouter.post('/:id/purchase', purchase);

// Admin only routes
vehicleRouter.post('/', requireAdmin, create);
vehicleRouter.put('/:id', requireAdmin, update);
vehicleRouter.delete('/:id', requireAdmin, remove);
vehicleRouter.post('/:id/restock', requireAdmin, restock);
