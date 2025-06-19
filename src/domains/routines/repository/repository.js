import { prisma } from '../../utils/prisma.js';

export class RoutinesRepository {
  /* 루틴 생성 수정*/
  createRoutine = async (journalId, title) => {
    return await prisma.routine.create({
      data: {
        journalId: journalId,
        title: title,
      },
    });
  };

  /* 루틴 업데이트 */
  updateRoutineById = async (routineId, updateData) => {
    return await prisma.routine.update({
      where: { id: routineId },
      data: updateData,
    });
  };

  /* 중복 생성 방지 */
  findByJournalIdAndTitle = async (journalId, title) => {
    return await prisma.routine.findFirst({
      where: {
        journalId: journalId,
        title: title,
      },
    });
  };

  findRoutineById = async (routineId) => {
    return await prisma.routine.findUnique({
      where: { id: routineId },
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
