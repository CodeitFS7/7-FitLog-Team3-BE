// 값이 비어있지 않은 문자열인지 확인하는 함수
export const isRequiredString = (value) => {
  return typeof value === 'string' && value.trim() !== '';
};

// 문자열의 길이가 주어진 범위 내에 있는지 확인하는 함수
export const isLengthBetween = (value, minLength, maxLength) => {
  return typeof value === 'string' && minLength <= value.length && value.length <= maxLength;
};

// 비밀번호가 최소 한 개 이상의 영문과 숫자를 포함하는지 확인하는 함수
export const isValidPasswordCombination = (password) => {
  const combinaionRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
  return combinaionRegex.test(password);
};

// 값이 문자열인지 확인하는 함수
export const isString = (value) => {
  return typeof value === 'string';
};

// 값이 정수인지 확인하는 함수
export const isInteger = (value) => {
  return Number.isInteger(value);
};

// 숫자가 주어진 범위 내에 있는지 확인하는 함수
export const isNumberInRange = (number, min, max) => {
  return typeof number == 'number' && min <= number && number <= max;
};
