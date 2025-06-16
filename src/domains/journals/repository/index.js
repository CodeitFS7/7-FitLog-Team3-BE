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
}
