import { isLengthBetween, isRequiredString } from '../utils/validator.utils.js';

export const validateRoutineUpdate = (req, res, next) => {
  try {
    const { title } = req.body;

    if (title !== undefined) {
      if (!isRequiredString(title)) {
        throw new Error('내용을 입력하세요');
      }
      if (!isLengthBetween(title, 1, 35)) {
        throw new Error('더 이상 글자를 입력할 수 없습니다.');
      }
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
