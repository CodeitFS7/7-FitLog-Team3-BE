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
    const [journals, totalCount] = await prisma.$transaction([
      prisma.journal.findMany(options),

      prisma.journal.count({ where: options.where }),
    ]);

    return [journals, totalCount];
  };

  // id로 journal을 조회하는 함수
  findById = async (id) => {
    return await prisma.journal.findUnique({
      where: { id },
    });
  };

  // id로 journal을 삭제하는 함수
  deleteById = async (id) => {
    return await prisma.journal.delete({
      where: { id },
    });
  };
}
