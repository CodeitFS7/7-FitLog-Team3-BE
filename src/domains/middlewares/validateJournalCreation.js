/* 해당 파일은 통일성 및 참조를 위해 참고용도로 dev 브런치에 있는 파일을 넣었습니다. */
import {
  isInteger,
  isLengthBetween,
  isNumberInRange,
  isRequiredString,
  isValidPasswordCombination,
} from '../utils/validator.utils.js';
export const validateCreateJournal = (req, res, next) => {
  try {
    const { title, nickname, description, password, background } = req.body;

    // title 유효성 검사
    if (!isRequiredString(title)) {
      throw new Error('제목은 필수 항목입니다.');
    }

    if (!isLengthBetween(title, 1, 10)) {
      throw new Error('제목은 1자 이상 10자 이하로 작성해주세요');
    }

    // 닉네임 유효성 검사
    if (!isRequiredString(nickname)) {
      throw new Error('닉네임은 필수 항목입니다.');
    }

    if (!isLengthBetween(nickname, 1, 10)) {
      throw new Error('닉네임은 1자이상 10자 이하로 작성해주세요.');
    }

    // description 유효성 검사
    if (!isRequiredString(description)) {
      throw new Error('설명은 필수 항목입니다.');
    }

    if (!isLengthBetween(description, 1, 40)) {
      throw new Error('설명은 1자이상 40자 이하로 작성해주세요.');
    }

    // 비밀번호 유효성 검사
    if (!isLengthBetween(password, 8, 15)) {
      throw new Error('비밀번호는 8자이상 15자 이하로 작성해주세요');
    }

    if (!isValidPasswordCombination(password)) {
      throw new Error('비밀번호는 영문과 숫자를 모두 포함해야 합니다.');
    }

    // background 유효성 검사
    if (!isInteger(background)) {
      throw new Error('배경 필드는 정수여야 합니다.');
    }

    if (!isNumberInRange(background, 0, 7)) {
      throw new Error('배경 필드는 0과 7사이의 값이어야 합니다.');
    }

    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

