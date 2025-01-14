import { PrismaClient, UserRoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const admin = {
    name: 'Sam',
    email: 'sam@mosaic.com',
    password: await createHash('password'),
    role: UserRoleEnum.ADMIN,
  };

  const user = await prisma.user.upsert({
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

  const servicesData = [
    {
      name: 'Plumbing',
      description: 'All plumbing related services',
      iconUrl: null,
    },
    {
      name: 'Painting',
      description: 'Interior and exterior painting services',
      iconUrl: null,
    },
    {
      name: 'Electrical',
      description: 'Electrical installation and repair',
      iconUrl: null,
    },
    {
      name: 'Landscaping',
      description: 'Garden and landscape design',
      iconUrl: null,
    },
    {
      name: 'Cleaning',
      description: 'Residential and commercial cleaning',
      iconUrl: null,
    },
    {
      name: 'Carpentry',
      description: 'Woodwork and carpentry services',
      iconUrl: null,
    },
    {
      name: 'Roofing',
      description: 'Roof installation and repair',
      iconUrl: null,
    },
    {
      name: 'HVAC',
      description: 'Heating, ventilation, and air conditioning',
      iconUrl: null,
    },
    {
      name: 'Flooring',
      description: 'Floor installation and maintenance',
      iconUrl: null,
    },
    {
      name: 'Masonry',
      description: 'Brick and stone masonry services',
      iconUrl: null,
    },
    {
      name: 'Pest Control',
      description: 'Pest and rodent control services',
      iconUrl: null,
    },
    {
      name: 'Security',
      description: 'Home and business security systems',
      iconUrl: null,
    },
    {
      name: 'Appliance Repair',
      description: 'Repair of household appliances',
      iconUrl: null,
    },
    {
      name: 'Window Installation',
      description: 'Window fitting and installation',
      iconUrl: null,
    },
    {
      name: 'Fencing',
      description: 'Fence installation and repair',
      iconUrl: null,
    },
    {
      name: 'Pool Maintenance',
      description: 'Swimming pool cleaning and maintenance',
      iconUrl: null,
    },
    {
      name: 'Gutter Cleaning',
      description: 'Gutter cleaning and maintenance',
      iconUrl: null,
    },
    {
      name: 'Solar Panel Installation',
      description: 'Installation of solar panels',
      iconUrl: null,
    },
    {
      name: 'Interior Design',
      description: 'Interior design and decoration',
      iconUrl: null,
    },
    {
      name: 'General Contracting',
      description: 'General construction and contracting',
      iconUrl: null,
    },
  ];

  await Promise.all(
    servicesData.map((service) =>
      prisma.service.upsert({
        where: {
          name: service.name,
        },
        update: {},
        create: service,
      }),
    ),
  );

  console.log('User seeded ', user);
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
