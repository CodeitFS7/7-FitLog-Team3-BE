import { deleteById, findById, updateById } from '../repository/journalRepository.js';

// 주어진 id의 journal이 존재하면 삭제하고, 없으면 에러를 던지는 서비스 함수
export const deleteJournalById = async (id) => {
  const journal = await findById(id);
  if (!journal) { 
    throw new Error('존재하지 않는 journal입니다.');
  }
  return await deleteById(id);
};