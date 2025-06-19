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

  findRoutineByJournalId = async (journalId) => {
    const routines = await prisma.routine.findMany({
      where: {
        journalId: journalId,
      },
    });
    return routines;
  };

  deleteRoutineById = async (id) => {
    return prisma.routine.delete({
      where: { id },
    });
  };
}
//   async findByJournalId(journalId) {
//     return prisma.routine.findMany({
//       where: { journalId },
//       orderBy: { createdAt: 'desc' },
//     });
//   }

//   async findById(id) {
//     return prisma.routine.findUnique({
//       where: { id },
//       include: { journal: true },
//     });
//   }

//   async deleteById(id) {
//     return prisma.routine.delete({
//       where: { id },
//     });
//   }
// }
