import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const findAll = () => {
  return prisma.routine.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

const findById = (id) => {
  return prisma.routine.findUnique({
    where: { id },
  });
};

const deleteById = (id) => {
  return prisma.routine.delete({
    where: { id },
  });
};

export default {
  findAll,
  findById,
  deleteById,
};
