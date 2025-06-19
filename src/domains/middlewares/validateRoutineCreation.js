import { isLengthBetween, isRequiredString, isUUID } from '../utils/validator.utils.js';

export const validateRoutineCreation = (req, res, next) => {
  try {
    const { title } = req.body;
    const { journalId } = req.params;

    if (!isRequiredString(title)) {
      throw new Error('내용을 입력하세요');
    }
    if (!isLengthBetween(title, 1, 35)) {
      throw new Error('더 이상 글자를 입력할 수 없습니다.');
    }

    if (!isUUID(journalId)) {
      throw Error('일지 ID는 UUID 형식이 아닙니다.');
    }
    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
