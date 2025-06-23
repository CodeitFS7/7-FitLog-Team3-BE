import { isRequiredString, isUUID } from '../utils/validator.utils.js'; // isUUID 임포트

export const validateUpdateCheckRoutine = (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { journalId } = req.query;

    const { date, ...restBody } = req.body;

    if (!isUUID(journalId)) {
      throw new Error('일지 ID는 유효한 UUID 형식이어야 합니다.');
    }

    if (!isUUID(routineId)) {
      throw new Error('루틴 ID는 유효한 UUID 형식이어야 합니다.')();
    }

    if (!isRequiredString(date)) {
      throw new Error('날짜는 필수 항목이며 비어있지 않은 문자열 형식이어야 합니다.');
    }

    // 날짜 형식이 'YYYY-MM-DD' 인지 추가로 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new Error('날짜는 YYYY-MM-DD 형식이어야 합니다.');
    }

    const checkDate = new Date(date);
    if (isNaN(checkDate.getTime())) {
      throw new Error('유효하지 않은 날짜 값입니다. 올바른 날짜를 입력해주세요.');
    }

    // 나머지 예상치 못한 필드 검사
    if (Object.keys(restBody).length > 0) {
      const unexpectedFields = Object.keys(restBody).join(', ');
      throw new Error(`예상치 못한 필드(${unexpectedFields})가 포함되어 있습니다.`);
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
