import { prisma } from '../../utils/prisma.js';

class ExerciseLogsRepository {
  createExerciseLog = async (logDataToCreate) => {
    const newExerciseLog = await prisma.exerciseLog.create({
      data: logDataToCreate,
    });
    return newExerciseLog;
  };

  getSumExercisePoint = async (journalId) => {
    const sumExercisePoint = await prisma.exerciseLog.aggregate({
      _sum: {
        exercisePoint: true,
      },
      where: {
        journalId: journalId,
      },
    });
    return sumExercisePoint;
  };
}

export default ExerciseLogsRepository;
