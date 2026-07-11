import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.vehicle.createMany({
    data: [
      { make: 'Toyota', model: 'Camry', category: 'Sedan', price: 25000, quantity: 10 },
      { make: 'Toyota', model: 'RAV4', category: 'SUV', price: 30000, quantity: 5 },
      { make: 'Toyota', model: 'Corolla', category: 'Sedan', price: 21000, quantity: 12 },
      { make: 'Honda', model: 'Civic', category: 'Sedan', price: 22000, quantity: 8 },
      { make: 'Ford', model: 'Mustang', category: 'Coupe', price: 45000, quantity: 2 },
      { make: 'Tesla', model: 'Model 3', category: 'Sedan', price: 40000, quantity: 4 },
      { make: 'Chevrolet', model: 'Silverado', category: 'Truck', price: 35000, quantity: 6 },
      { make: 'BMW', model: 'M3', category: 'Sedan', price: 70000, quantity: 1 },
    ]
  });
  console.log('Database seeded with vehicles!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
