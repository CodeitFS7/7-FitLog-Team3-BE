import { isInteger, isUUID, isValidISO8601 } from '../utils/validator.utils.js';

export const validatePostExerciseLog = (req, res, next) => {
  try {
    // startTime, endTime, goalTime, journalId
    const { journalId } = req.params;
    const { startTime, endTime, goalTime } = req.body;

    if (!isUUID(journalId)) {
      throw new Error('일지 ID는 유효한 UUID 형식이어야합니다.');
    }

    if (!isValidISO8601(startTime)) {
      throw new Error('startTime은 유효한 ISO 8601 날짜 형식이어야 합니다.');
    }

    if (!isValidISO8601(endTime)) {
      throw new Error('endTime은 유효한 ISO 8601 날짜 형식이어야 합니다.');
    }

    if (new Date(startTime) >= new Date(endTime)) {
      throw new Error('startTime은 endTime보다 빨라야합니다.');
    }

    if (!isInteger(goalTime)) {
      throw new Error('goalTime은 정수여야 합니다.');
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
