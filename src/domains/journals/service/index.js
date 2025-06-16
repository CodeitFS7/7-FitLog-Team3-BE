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
}
