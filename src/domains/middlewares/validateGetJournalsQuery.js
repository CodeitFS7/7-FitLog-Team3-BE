import { isString, isInteger } from '../utils/validator.utils.js';

export const validateGetJournalsQuery = (req, res, next) => {
  try {
    const { page, pageSize, keyword, orderBy } = req.query;

    if (page && !isInteger(parseInt(page, 10))) {
      throw new Error('page는 정수여야 합니다.');
    }

    if (pageSize && !isInteger(parseInt(pageSize, 10))) {
      throw new Error('pagesize는 정수여야 합니다.');
    }

    if (keyword && !isString(keyword)) {
      throw new Error('keyword는 문자열이어야 합니다.');
    }

    // routinePoint와 exercisePoint 중 routinePoint를 정렬기준으로 선택한 이유
    // Journal 목록 정렬 시, Journal 테이블에 직접 속한 routinePoint를 기준으로 정렬합니다.
    // (exercisePoint는 별도의 테이블에 존재)
    const allowedOrderBy = ['newest', 'oldest', 'routinePointHighest', 'routinePointLowest'];
    if (orderBy && !allowedOrderBy.includes(orderBy)) {
      throw new Error('정의되지 않은 정렬 기준입니다.');
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
