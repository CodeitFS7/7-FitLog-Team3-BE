import { isRequiredString } from '../utils/validator.utils.js';
import { isUUID } from '../utils/validator.utils.js';

export const validatePostEmoji = (req, res, next) => {
  try {
    const { journalId } = req.params;
    if (!isUUID(journalId)) {
      throw new Error('일지 ID는 유효한 UUID 형식이 아닙니다.');
    }

    const { emojiType } = req.body;
    if (!isRequiredString(emojiType)) {
      throw new Error('emojiType은 필수이며, 빈 문자열일 수 없습니다.');
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
