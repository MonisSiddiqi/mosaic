import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { tier3Services } from './data';

const prisma = new PrismaClient();

async function main() {
  const plan1 = await prisma.plan.findFirst({
    where: {
      name: 'High-Value Trades',
    },
  });

  if (plan1) {
    for (const item of tier3Services) {
      const service = await prisma.service.findFirst({
        where: {
          name: item,
        },
      });

      if (service) {
        await prisma.service.update({
          where: {
            id: service.id,
          },
          data: {
            planId: plan1.id,
          },
        });
      }
    }
  }
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
