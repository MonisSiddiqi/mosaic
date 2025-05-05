import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    where: {
      Bid: {
        some: {
          vendorStatus: 'ACCEPTED',
          userStatus: 'PENDING',
        },
      },
    },
  });

  console.log(projects.length);

  for (const project of projects) {
    await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        status: 'VENDOR_FOUND',
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
