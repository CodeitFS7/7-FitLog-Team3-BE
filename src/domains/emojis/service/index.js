export class EmojisService {
  constructor(emojisRepository, journalsRepository) {
    this.emojisRepository = emojisRepository;
    this.journalsRepository = journalsRepository;
  }

  addOrUpdateEmoji = async (journalId, emojiType) => {
    // 만약 EmojiType(사용할 수 있는 이모지를 저장하는 이모지테이블) 추가시 아래의 TODO가 수행되어야 합니다.
    // TODO : 이모지 타입(emojiId)에 해당되는 이모지가 없는경우 404에러 로직 작성 추가 필요

    const journal = await this.journalsRepository.findJournalById(journalId);

    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    const updateEmoji = await this.emojisRepository.upsertEmoji(journalId, emojiType);

    return updateEmoji;
  };

  getEmojisByJournalId = async (journalId) => {
    const journal = await this.journalsRepository.findJournalById(journalId);

    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    const emojis = await this.emojisRepository.getEmojisByJournalId(journalId);

    return emojis;
  };
}
