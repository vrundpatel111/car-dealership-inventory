import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllVehicles = async () => {
  return prisma.vehicle.findMany();
};

// Dedicated search with make, model, category, and price range
export const searchVehicles = async (params: {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const where: any = {};

  if (params.make) where.make = { contains: params.make, mode: 'insensitive' };
  if (params.model) where.model = { contains: params.model, mode: 'insensitive' };
  if (params.category) where.category = { contains: params.category, mode: 'insensitive' };

  // Price range: only add if at least one bound is provided
  if (params.minPrice !== undefined || params.maxPrice !== undefined) {
    where.price = {};
    if (params.minPrice !== undefined) where.price.gte = params.minPrice;
    if (params.maxPrice !== undefined) where.price.lte = params.maxPrice;
  }

  return prisma.vehicle.findMany({ where });
};

export const createVehicle = async (data: any) => {
  return prisma.vehicle.create({ data });
};

export const updateVehicle = async (id: number, data: any) => {
  return prisma.vehicle.update({ where: { id }, data });
};

export const deleteVehicle = async (id: number) => {
  return prisma.vehicle.delete({ where: { id } });
};

export const purchaseVehicle = async (id: number) => {
  // Atomic decrement
  return prisma.$transaction(async (tx) => {
    const vehicle = await tx.vehicle.findUnique({ where: { id } });
    if (!vehicle || vehicle.quantity <= 0) {
      const err: any = new Error('Vehicle out of stock or not found');
      err.statusCode = 400;
      throw err;
    }
    return tx.vehicle.update({
      where: { id },
      data: { quantity: vehicle.quantity - 1 }
    });
  });
};

export const restockVehicle = async (id: number, amount: number) => {
  return prisma.vehicle.update({
    where: { id },
    data: { quantity: { increment: amount } }
  });
};
