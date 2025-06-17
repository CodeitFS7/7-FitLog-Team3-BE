import prisma from "../prismaClient.js";

class exerciseLogRepository {
  async create(data) {
    return await prisma.exerciseLog.create({ data });
  }
}

export default exerciseLogRepository;