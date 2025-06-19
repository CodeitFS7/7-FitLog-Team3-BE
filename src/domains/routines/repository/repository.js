import { prisma } from '../../utils/prisma.js';

export class RoutinesRepository {
  /* 루틴 생성 수정o*/
  createRoutine = async (journalId, title) => {
    return await prisma.routine.create({
      data: {
        journalId: journalId,
        title: title,
      },
    });
  };

  /* 루틴 업데이트 */
  async findByIdAndUpdate(id, updateData) {
    return await this.prisma.routine.update({
      where: { id },
      data: updateData,
    });
  }

  /* 중복 생성 방지 수정o*/
  findByJournalIdAndTitle = async (journalId, title) => {
    return await prisma.routine.findFirst({
      where: {
        journalId: journalId,
        title: title,
      },
    });
  };

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
