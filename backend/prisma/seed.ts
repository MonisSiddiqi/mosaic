import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { plans } from './data';

const prisma = new PrismaClient();

async function main() {
  assignRandomService();
}

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

async function assignRandomService() {
  const vendors = await prisma.user.findMany();

  const services = await prisma.service.findMany();

  for (const vendor of vendors) {
    for (const service of services.slice(0, 7)) {
      const existingVendorService = await prisma.vendorService.findFirst({
        where: {
          userId: vendor.id,
          serviceId: service.id,
        },
      });

      if (!existingVendorService) {
        await prisma.vendorService.create({
          data: {
            userId: vendor.id,
            serviceId: service.id,
          },
        });
      }
    }
  }
}
