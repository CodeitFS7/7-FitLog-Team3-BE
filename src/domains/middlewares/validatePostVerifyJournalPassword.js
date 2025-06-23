import {
  isRequiredString,
  isUUID,
  isLengthBetween,
  isValidPasswordCombination,
} from '../utils/validator.utils.js';

export const validatePostVerifyJournalPassword = (req, res, next) => {
  try {
    // startTime, endTime, goalTime, journalId
    const { journalId } = req.params;
    const { password } = req.body;

    if (!isUUID(journalId)) {
      throw new Error('일지 ID는 유효한 UUID 형식이어야합니다.');
    }

    if (!isLengthBetween(password, 8, 15)) {
      throw new Error('비밀번호는 8자이상 15자 이하로 작성해주세요');
    }

    if (!isValidPasswordCombination(password)) {
      throw new Error('비밀번호는 영문과 숫자를 모두 포함해야 합니다.');
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
