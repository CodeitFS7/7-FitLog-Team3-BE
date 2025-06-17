import routineRepository from '../repository/repository.js';

const getAllRoutines = async () => {
  try {
    return await routineRepository.findAll();
  } catch (err) {
    const error = new Error('루틴 조회 실패');
    error.status = 500;
    throw error;
  }
};

const deleteRoutine = async (id, userId) => {
  const routine = await routineRepository.findById(id);

  if (!routine) {
    const error = new Error('루틴이 존재하지 않습니다');
    error.status = 404;
    throw error;
  }

  // 권한 검사 예시 (루틴 생성자만 삭제 가능)
  if (routine.userId !== userId) {
    const error = new Error('해당 루틴에 대한 권한이 없습니다');
    error.status = 403;
    throw error;
  }

  try {
    return await routineRepository.deleteById(id);
  } catch (err) {
    const error = new Error('루틴 삭제 실패');
    error.status = 500;
    throw error;
  }
};

export default {
  getAllRoutines,
  deleteRoutine,
};
