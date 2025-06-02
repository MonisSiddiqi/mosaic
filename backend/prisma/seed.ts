import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const end = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  await prisma.userPlan.create({
    data: {
      User: {
        connect: {
          id: '4d18d2c1-3822-4dae-8e75-51b0fc6b1e70',
        },
      },
      Plan: {
        connect: {
          id: '1ea4a0df-c42e-438b-a5c9-1eab27ee08b9',
        },
      },
      amount: 80,
      startDate: now,
      endDate: end,
      paymentId: 'abc123',
    },
  });
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
