import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log(await prisma.plan.deleteMany());
  console.log(
    await prisma.plan.createMany({
      data: [
        {
          id: '82039509-b495-4087-8fbb-db3dd0319e46',
          name: 'High-Value Trades',
          description: null,
          amount: 99,
          isPopular: false,
          productId: 'prod_SIYwRBQSrC8Hil',
          priceId: 'price_1RNxoBL4fcg7zzCFg7OoqzIc',
          yearlyProductId: 'prod_SIaetOdwVp5QMJ',
          yearlyPriceId: 'price_1RNzT8L4fcg7zzCF26YWuXaS',
          updatedAt: '2025-05-12T16:44:46.831Z',
          createdAt: '2025-04-19T21:35:32.148Z',
        },
        {
          id: '1ea4a0df-c42e-438b-a5c9-1eab27ee08b9',
          name: 'Skilled Trades',
          description: null,
          amount: 80,
          isPopular: true,
          productId: 'prod_SIYw22Jix33xTH',
          priceId: 'price_1RNxoCL4fcg7zzCFZar5yerU',
          yearlyProductId: 'prod_SIaeD3rsbRwnQg',
          yearlyPriceId: 'price_1RNzT9L4fcg7zzCFt4Rcjd3f',
          updatedAt: '2025-05-12T16:44:47.856Z',
          createdAt: '2025-04-19T21:35:32.146Z',
        },
        {
          id: '7f0e4a96-69ae-48ed-bdaf-717d9b7b714c',
          name: 'Essential Trades',
          description: null,
          amount: 50,
          isPopular: false,
          productId: 'prod_SIYwrsG45KVqEh',
          priceId: 'price_1RNxoCL4fcg7zzCFTcfwuAbW',
          yearlyProductId: 'prod_SIaeTufLYR9Hlu',
          yearlyPriceId: 'price_1RNzTAL4fcg7zzCFk7wAiG8H',
          updatedAt: '2025-05-12T16:44:48.878Z',
          createdAt: '2025-04-19T21:35:32.140Z',
        },
      ],
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}
