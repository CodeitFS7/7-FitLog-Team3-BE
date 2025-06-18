import { prisma } from '../../utils/prisma.js';

class ExerciseLogRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  async create(data) {
    return await this.prisma.exerciseLog.create({ data });
  }
}

export default ExerciseLogRepository;
