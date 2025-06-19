import { prisma } from '../../utils/prisma.js';

export class RoutinesRepository {
  /* 루틴 생성 */
  async create(data) {
    return await prisma.routine.create({ data });
  }

  /* 루틴 업데이트 */
  async findByIdAndUpdate(id, updateData) {
    return await this.prisma.routine.update({
      where: { id },
      data: updateData,
    });
  }

  /* 중복 생성 방지 */
  async findByJournalIdAndTitle(journalId, title) {
    return await this.prisma.routine.findFirst({
      where: {
        journalId: journalId,
        title: title,
      },
    });
  }

  findByJournalId = async (journalId) => {
    return prisma.routine.findMany({
      where: { journalId },
      orderBy: { createdAt: 'desc' },
    });
  };

  findById = async (id) => {
    return prisma.routine.findUnique({
      where: { id },
      include: { journal: true },
    });
  };

  deleteById = async (id) => {
    return prisma.routine.delete({
      where: { id },
    });
  };
}
