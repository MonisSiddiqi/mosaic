import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const admin = {
    name: 'Sam',
    email: 'sam@mosaic.com',
    password: await createHash('password'),
    role: UserRole.ADMIN,
  };

  const prismaAdmin = await prisma.user.upsert({
    where: {
      email: admin.email,
    },
    update: {},
    create: {
      email: admin.email,
      role: admin.role,
      password: await createHash('password'),
      isActive: true,
      UserProfile: {
        create: {
          name: admin.name,
        },
      },
    },
  });

  const user = await prisma.user.upsert({
    where: {
      email: 'user@mosaic.com',
    },
    update: {},
    create: {
      email: 'user@mosaic.com',
      role: UserRole.USER,
      password: await createHash('password'),
      isActive: true,
      UserProfile: {
        create: {
          name: 'User',
        },
      },
    },
  });

  console.log('User seeded', user);
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
