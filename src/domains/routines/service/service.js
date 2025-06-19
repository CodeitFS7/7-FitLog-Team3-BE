export class RoutineService {
  constructor(routineRepository) {
    this.routineRepository = routineRepository;
  }

  async getAllRoutines(journalId) {
    try {
      return await this.routineRepository.findByJournalId(journalId);
    } catch (err) {
      const error = new Error('루틴 조회 실패');
      error.status = 500;
      throw error;
    }
  }

  async deleteRoutine(id, userId) {
    const routine = await this.routineRepository.findById(id);

    if (!routine) {
      const error = new Error('루틴이 존재하지 않습니다');
      error.status = 404;
      throw error;
    }

    if (routine.journal.userId !== userId) {
      const error = new Error('해당 루틴에 대한 권한이 없습니다');
      error.status = 403;
      throw error;
    }

    try {
      return await this.routineRepository.deleteById(id);
    } catch (err) {
      const error = new Error('루틴 삭제 실패');
      error.status = 500;
      throw error;
    }
  }
}
