export class JournalsService {
  journalsRepository;
  constructor(journalsRepository) {
    this.journalsRepository = journalsRepository;
  }

  createJournal = async (title, nickname, description, password, background) => {
    // 비밀번호 암호화 처리 논의 필요
    // 암호화가 필요하다면 bcrypt 라이브러리 사용하여 암호화 로직 구현 예정
    const createdJournal = await this.journalsRepository.createJournal(
      title,
      nickname,
      description,
      password,
      background
    );

    // Controller에 반환할 때, 보안을 위해 비밀번호에 대한 데이터는 돌려주지 않음.
    createdJournal.password = undefined;
    return createdJournal;
  };

  findAllJournals = async (queryParams) => {
    const { page = 1, pageSize = 6, keyword = '', orderBy = 'newest' } = queryParams;

    const prismaOptions = {
      skip: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
      take: parseInt(pageSize, 10),
    };

    switch (orderBy) {
      case 'oldest':
        prismaOptions.orderBy = { createdAt: 'asc' };
        break;
      case 'routinePointHighest':
        prismaOptions.orderBy = { routinePoint: 'desc' };
        break;
      case 'routinePointLowest':
        prismaOptions.orderBy = { routinePoint: 'asc' };
        break;
      case 'newest':
      default:
        prismaOptions.orderBy = { createdAt: 'desc' };
        break;
    }

    if (keyword) {
      prismaOptions.where = {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { nickname: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ],
      };
    }

    const [journals, totalCount] =
      await this.journalsRepository.findAllJournalsWithOptions(prismaOptions);

    // 보안을 위해 응답 데이터에서 비밀번호 필드를 제거
    const journalsWithoutPassword = journals.map((journal) => {
      const { password, ...rest } = journal;
      return rest;
    });

    return {
      journals: journalsWithoutPassword,
      totalCount: totalCount,
    };
  };

  deleteJournalById = async (id) => {
    const journal = await findById(id);
    if (!journal) {
      throw new Error('존재하지 않는 journal입니다.');
    }
    return await deleteById(id);
  };
}
