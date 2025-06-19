import { isUUID } from '../utils/validator.utils.js';

export const validateDeleteRoutineById = (req, res, next) => {
  try {
    const { journalId } = req.query;
    const { routineId } = req.params;
    if (!isUUID(journalId)) {
      throw new Error('일지 ID는 유효한 UUID 형식이 아닙니다.');
    }

    if (!isUUID(routineId)) {
      throw new Error('루틴 ID는 유효한 UUID 형식이 아닙니다.');
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
