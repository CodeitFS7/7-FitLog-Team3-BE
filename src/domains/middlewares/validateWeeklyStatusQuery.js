import { isUUID, isRequiredString } from '../utils/validator.utils.js'; // isRequiredString 임포트 확인

export const validateWeeklyStatusQuery = (req, res, next) => {
  try {
    const { journalId, date } = req.query;

    if (!isUUID(journalId)) {
      throw new Error('일지 ID는 유효한 UUID 형식이어야 합니다.');
    }

    if (!isRequiredString(date)) {
      throw new Error('날짜는 필수 항목이며 비어있지 않은 문자열 형식이어야 합니다.');
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식 정규식
    if (!dateRegex.test(date)) {
      throw new Error('날짜는 YYYY-MM-DD 형식이어야 합니다.');
    }
    const checkDate = new Date(date);
    if (isNaN(checkDate.getTime())) {
      throw new Error('유효하지 않은 날짜 값입니다. 올바른 날짜를 입력해주세요.');
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
