import { prisma } from '../../utils/prisma.js';

// id로 journal을 조회하는 함수
export const findById = async (id) => {
  return await prisma.journal.findUnique({
    where: { id },
  });
};

// id로 journal을 삭제하는 함수
export const deleteById = async (id) => {
  return await prisma.journal.delete({
    where: { id },
  });
};