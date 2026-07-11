import { Request, Response, NextFunction } from 'express';
import * as vehicleService from '../services/vehicle.service';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

export const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query;

    const vehicles = await vehicleService.searchVehicles({
      make: make as string | undefined,
      model: model as string | undefined,
      category: category as string | undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });

    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { make, model, category, price, quantity } = req.body;
    
    // Manual validation
    if (!make || !model || !category || price === undefined) {
      return res.status(400).json({ error: { message: 'Make, model, category, and price are required' } });
    }

    const vehicle = await vehicleService.createVehicle({ make, model, category, price: Number(price), quantity: quantity || 0 });
    res.status(201).json(vehicle);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicle = await vehicleService.updateVehicle(Number(req.params.id), req.body);
    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await vehicleService.deleteVehicle(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const purchase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicle = await vehicleService.purchaseVehicle(Number(req.params.id));
    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};

export const restock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: { message: 'Valid restock amount is required' } });
    }
    const vehicle = await vehicleService.restockVehicle(Number(req.params.id), Number(amount));
    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};
