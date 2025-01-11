import { Prisma } from '@prisma/client';

export const userSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};
