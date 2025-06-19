import {
  isInteger,
  isLengthBetween,
  isNumberInRange,
  isRequiredString,
  isValidPasswordCombination,
} from '../utils/validator.utils.js';
export const validatePatchJournals = (req, res, next) => {
  try {
    const updateData = req.body;

    for (const key in updateData) {
      const value = updateData[key];

      switch (key) {
        case 'title':
          if (!isRequiredString(value) || !isLengthBetween(value, 1, 10)) {
            throw new Error('제목은 1자 이상 10자 이하로 작성해주세요.');
          }
          break;

        case 'nickname':
          if (!isRequiredString(value) || !isLengthBetween(value, 1, 10)) {
            throw new Error('닉네임은 1자이상 10자 이하로 작성해주세요.');
          }
          break;

        case 'description':
          if (!isRequiredString(value) || !isLengthBetween(value, 1, 40)) {
            throw new Error('설명은 1자이상 40자 이하로 작성해주세요.');
          }
          break;

        case 'password':
          if (!isLengthBetween(value, 8, 15) || !isValidPasswordCombination(value)) {
            throw new Error(
              '비밀번호는 8자이상 15자 이하로 작성해야하며, 영문과 숫자를 모두 포함해야 합니다.'
            );
          }
          break;

        case 'background':
          if (!isInteger(value) || !isNumberInRange(value, 0, 7)) {
            throw new Error('배경 필드는 0과 7사이의 값이어야 합니다.');
          }
          break;

        case 'id':
        case 'createdAt':
        case 'updatedAt':
        case 'routinePoint':
          throw new Error(`${key}는 수정할 수 없습니다.`);
      }
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
