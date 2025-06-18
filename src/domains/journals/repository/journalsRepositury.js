export class JournalsRepository {
    constructor(prisma) { 
        this.prisma = prisma || new PrismaClient(); 
    }
}

export const journalsRepository = new JournalsRepository();