import prisma from "../prismaClient.js";

class routinesRepository {
  async create(data) {
    return await prisma.routines.create({ data });
  }
}

export default routinesRepository;
