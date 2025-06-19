import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class RoutineRepository {
  async findByJournalId(journalId) {
    return prisma.routine.findMany({
      where: { journalId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id) {
    return prisma.routine.findUnique({
      where: { id },
      include: { journal: true },
    });
  }

  async deleteById(id) {
    return prisma.routine.delete({
      where: { id },
    });
  }
}
