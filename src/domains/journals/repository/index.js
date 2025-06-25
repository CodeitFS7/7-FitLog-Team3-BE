import { prisma } from '../../utils/prisma.js';

export class JournalsRepository {
  createJournal = async (title, nickname, description, password, background) => {
    const createdJournal = await prisma.journal.create({
      data: {
        title: title,
        nickname: nickname,
        description: description,
        password: password,
        background: background,
      },
    });
    return createdJournal;
  };

  findAllJournalsWithOptions = async (options) => {

    const findManyOptions = {
      ...options,
      include: {
        emoji: true,
      },
    };
    const [journals, totalCount] = await prisma.$transaction([
      prisma.journal.findMany(findManyOptions),


      prisma.journal.count({ where: options.where }),
    ]);

    return [journals, totalCount];
  };

  findJournalById = async (journalId) => {
    const journal = await prisma.journal.findUnique({
      where: { id: journalId },
      include: {
        emoji: true,
      },
    });

    return journal;
  };

  // id로 journal을 삭제하는 함수
  deleteJournalById = async (journalId) => {
    return await prisma.journal.delete({
      where: { id: journalId },
    });
  };

  // id로 journal을 수정하는 함수
  updateJournalById = async (journalId, updateData) => {
    const updatedJournal = await prisma.journal.update({
      where: { id: journalId },
      data: updateData,
    });

    return updatedJournal;
  };

  updateRoutinePoint = async (journalId, pointChange) => {
    return await prisma.journal.update({
      where: { id: journalId },
      data: {
        routinePoint: {
          increment: pointChange, // pointChange 값만큼 routinePoint 필드를 증감시킵니다.
          // pointChange가 1이면 +1, -1이면 -1이 됩니다.
        },
      },
    });
  };
}
