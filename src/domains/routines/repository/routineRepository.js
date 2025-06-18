import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class RoutinesRepository { 
    constructor() {
        this.prisma = prisma; 
    }
/* 루틴 생성 */
  async create(data) {
    return await prisma.routines.create({ data });
  }

  /* 루틴 업데이트 */ 
  async findByIdAndUpdate(id, updateData) {
        return await this.prisma.routine.update({
            where: { id },
            data: updateData,
        });
    }

/* 중복 생성 방지 */
     async findByJournalIdAndTitle(journalId, title) {
        return await this.prisma.routine.findFirst({ 
            where: {
                journalId: journalId,
                title: title,
            },
        });
    }
}

export const routinesRepository = new RoutinesRepository();