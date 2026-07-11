import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllVehicles = async (searchParams?: any) => {
  const where: any = {};
  if (searchParams?.make) where.make = { contains: searchParams.make };
  if (searchParams?.model) where.model = { contains: searchParams.model };
  if (searchParams?.category) where.category = { contains: searchParams.category };

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
