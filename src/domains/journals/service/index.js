export class JournalsService {
  journalsRepository;
  exerciseLogsService;
  constructor(journalsRepository, exerciseLogsService) {
    this.journalsRepository = journalsRepository;
    this.exerciseLogsService = exerciseLogsService;
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

    const journalsWithExercisePoints = await Promise.all(
      journals.map(async (journal) => {
        // journal.id를 사용하여 ExerciseLogsService의 getSumExercisePoint 호출
        const sumExercisePointData = await this.exerciseLogsService.getSumExercisePoint(journal.id);
        // getSumExercisePoint는 숫자 값만 반환하도록 서비스에서 가공했으니, 바로 사용
        return {
          ...journal,
          totalExercisePoint: sumExercisePointData,
        };
      })
    );

    // 보안을 위해 응답 데이터에서 비밀번호 필드를 제거
    const journalsWithoutPassword = journalsWithExercisePoints.map((journal) => {
      const { password, ...rest } = journal; // password 필드를 제외하고 나머지 필드를 가져옴
      return rest;
    });

    return {
      journals: journalsWithoutPassword,
      totalCount: totalCount,
    };
  };

  getJournalById = async (journalId) => {
    const journal = await this.journalsRepository.findJournalById(journalId);
    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }
    journal.password = undefined;
    return journal;
  };

  deleteJournalById = async (journalId) => {
    const journal = await this.journalsRepository.findJournalById(journalId);
    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }
    return await this.journalsRepository.deleteJournalById(journalId);
  };

  updateJournalById = async (journalId, updateData) => {
    const journal = await this.journalsRepository.findJournalById(journalId);
    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }
    const updatedJournal = await this.journalsRepository.updateJournalById(journalId, updateData);

    // Controller에 반환할 때, 보안을 위해 비밀번호에 대한 데이터는 돌려주지 않음.
    updatedJournal.password = undefined;
    return updatedJournal;
  };

  verifyJournalPassword = async (journalId, inputPassword) => {
    const journal = await this.journalsRepository.findJournalById(journalId);
    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    if (journal.password !== inputPassword) {
      const error = new Error('비밀번호가 일치하지 않습니다.');
      error.statusCode = 401;
      throw error;
    }

    return true;
  };
}
