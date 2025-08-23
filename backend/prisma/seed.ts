import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { plans } from './data';

const prisma = new PrismaClient();

async function main() {
resetPlans();}

async function connectServicePlan() {
  for (const plan of plans) {
    const existingPlan = await prisma.plan.findFirst({
      where: { name: plan.name },
    });

    if (existingPlan) {
      for (const service of plan.services) {
        const existingService = await prisma.service.findFirst({
          where: { name: service.name },
        });

        if (existingService) {
          await prisma.service.update({
            where: { id: existingService.id },
            data: {
              planId: existingPlan.id,
            },
          });
        }
      }
    }
  }
}

async function resetPlans() {
  const plans = await prisma.plan.findMany();

  for (const plan of plans) {
    await prisma.plan.update({
      where: {
        id: plan.id,
      },
      data: {
        priceId: null,
        productId: null,
        yearlyPriceId: null,
        yearlyProductId: null,
      },
    });
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
