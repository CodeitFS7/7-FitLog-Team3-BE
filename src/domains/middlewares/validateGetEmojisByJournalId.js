import { isUUID } from '../utils/validator.utils.js';

export const validateGetEmojisByJournalId = (req, res, next) => {
  try {
    const { journalId } = req.params;
    if (!isUUID(journalId)) {
      throw new Error('일지 ID는 유효한 UUID 형식이 아닙니다.');
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
