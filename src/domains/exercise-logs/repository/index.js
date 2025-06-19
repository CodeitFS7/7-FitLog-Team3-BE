import { prisma } from '../../utils/prisma.js';

class ExerciseLogRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  async create(data) {
    return await this.prisma.exerciseLog.create({ data });
  }

  //Get
  findLatestByJournalId = async (journalId) => {
    return await this.prisma.exerciseLog.findFirst({
      where: { journalId },
      orderBy: { endTime: 'desc' },
    });
  };

  //지금까지 얻은 포인트의 총합. 한 journalId에 저장된 earnedPoints를 모두 더함.
  //아직 운동한적 없어서 기록이 없으면 0
  sumEarnedPoints = async (journalId) => {
    const result = await this.prisma.exerciseLog.aggregate({
      where: { journalId },
      _sum: {
        earnedPoints: true,
      },
    });
    return result._sum.earnedPoints || 0;
  };
}

export default ExerciseLogRepository;
