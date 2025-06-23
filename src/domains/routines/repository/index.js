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

  getAllRoutinesByJournalId = async (journalId) => {
    const routines = await prisma.routine.findMany({
      where: {
        journalId: journalId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return routines;
  };

  deleteRoutineById = async (id) => {
    return prisma.routine.delete({
      where: { id },
    });
  };

  findRoutineCheckByRoutineIdAndDate = async (routineId, date) => {
    const queryDate = new Date(date);
    queryDate.setUTCHours(0, 0, 0, 0);

    return await prisma.routineCheck.findUnique({
      where: {
        routineId_date: {
          routineId: routineId,
          date: queryDate,
        },
      },
    });
  };

  upsertRoutineCheck = async (routineId, journalId, date, isCompleted) => {
    const checkDate = new Date(date);
    checkDate.setUTCHours(0, 0, 0, 0); // UTC 자정으로 설정

    return await prisma.routineCheck.upsert({
      where: {
        // `@@unique([routineId, date])` 복합 유니크 키를 활용하여
        // 해당 날짜의 특정 루틴 체크 기록을 찾거나 새로 만듭니다.
        routineId_date: {
          routineId: routineId,
          date: checkDate,
        },
      },
      update: {
        isCompleted: isCompleted,
      },
      create: {
        // 기록이 없으면 새로 생성합니다.
        journalId: journalId,
        routineId: routineId,
        date: checkDate,
        isCompleted: isCompleted,
      },
    });
  };

  findRoutineChecksByJournalIdAndDateRange = async (journalId, startDate, endDate) => {
    const startOfDay = new Date(startDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(endDate);
    endOfDay.setUTCHours(23, 59, 59, 999); // 해당 날짜의 마지막 순간까지 포함

    return await prisma.routineCheck.findMany({
      where: {
        journalId: journalId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        isCompleted: true,
      },
    });
  };
}
