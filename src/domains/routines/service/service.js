export class RoutinesService {
  constructor(routinesRepository, journalsRepository) {
    this.routinesRepository = routinesRepository;
    this.journalsRepository = journalsRepository;
  }
  // 화살표 함수를 사용하여 'this'가 RoutinesService 인스턴스를 정확히 가리키도록 보장합니다.
  // 화살표 함수로 변경한 자세한 이유는 백엔드 아카이빙 문서로 정리해두었습니다.
  createRoutine = async (journalId, title) => {
    const journal = await this.journalsRepository.findJournalById(journalId);

    // 저널 존재 여부 확인
    if (!journal) {
      // 여기서 에러메시지와, 에러코드를 정해서 에러를 던져주면 에러라우터에서 처리해줍니다.
      // 아래 코드에는 일지로 되어있어서 통일하기위해서 앞으로 에러코드에서는 저널로되어있는 부분은 일지로 수정하겠습니다.
      const error = new Error('루틴을 생성할 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    // 동일한 루틴 중복 생성 방지
    const existingRoutineWithSameTitle = await this.routinesRepository.findByJournalIdAndTitle(
      journalId,
      title
    );

    if (existingRoutineWithSameTitle) {
      const error = new Error('일지에 이미 존재하는 루틴입니다.');
      error.statusCode = 409;
      throw error;
    }

    // 서비스로직에서 try catch를 제외한 이유는 백엔드 아카이빙 문서에 정리해두었습니다!
    // 이 Service가 여러 Repository(Journals, Routines)를 다루므로,
    // 호출하는 메서드가 어떤 리소스를 생성하는지(createRoutine) 명확히 하기 위해 메서드 명을 변경하였습니다.
    const newRoutine = await this.routinesRepository.createRoutine(journalId, title);
    return newRoutine;
  };

  updateRoutineById = async (routineId, updateData) => {
    // 루틴 존재 여부 확인
    const existingRoutine = await this.routinesRepository.findRoutineById(routineId);
    if (!existingRoutine) {
      const error = new Error('업데이트할 루틴을 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    // 업데이트 사항 여부 확인 및 중복 검사
    if (updateData.title && updateData.title !== existingRoutine.title) {
      const existingRoutineWithSameTitle = await this.routinesRepository.findByJournalIdAndTitle(
        existingRoutine.journalId,
        updateData.title
      );
      if (existingRoutineWithSameTitle) {
        const error = new Error('일지에 이미 존재하는 루틴입니다.');
        error.statusCode = 409;
        throw error;
      }
    }

    // 변경 사항이 없을 경우 업데이트를 진행하지 않음
    if (!updateData.title || updateData.title === existingRoutine.title) {
      return {
        message: '변경 사항이 없어 루틴을 업데이트하지 않았습니다.',
        routine: existingRoutine,
      };
    }

    const updatedRoutine = await this.routinesRepository.updateRoutineById(routineId, updateData);
    return {
      message: '루틴이 성공적으로 수정되었습니다.',
      routine: updatedRoutine,
    };
  };

  getAllRoutines = async (journalId) => {
    try {
      return await this.routinesRepository.findJournalById(journalId);
    } catch (err) {
      const error = new Error('루틴 조회 실패');
      error.status = 500;
      throw error;
    }
  };

  deleteRoutine = async (id, userId) => {
    const routine = await this.routinesRepository.findById(id);

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
      return await this.routinesRepository.deleteById(id);
    } catch (err) {
      const error = new Error('루틴 삭제 실패');
      error.status = 500;
      throw error;
    }
  };
}
