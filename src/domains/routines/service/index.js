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

  getAllRoutinesByJournalId = async (journalId) => {
    // 일지에 해당하는 루틴을 가져왔을때, 루틴이 없을 경우 에러
    const routines = await this.routinesRepository.getAllRoutinesByJournalId(journalId);
    if (!routines) {
      const error = new Error('루틴이 존재하지 않습니다.');
      error.status = 404;
      throw error;
    }
    return routines;
  };

  deleteRoutineById = async (journalId, routineId) => {
    const routine = await this.routinesRepository.findRoutineById(routineId);

    if (!routine) {
      const error = new Error('루틴이 존재하지 않습니다');
      error.status = 404;
      throw error;
    }

    if (routine.journalId !== journalId) {
      const error = new Error('이 루틴을 삭제할 권한이 없습니다.');
      error.statusCode = 403; // Forbidden (금지됨)
      throw error;
    }

    return await this.routinesRepository.deleteRoutineById(routineId);
  };

  updateCheckRoutine = async (routineId, journalId, date) => {
    const journal = await this.journalsRepository.findJournalById(journalId);
    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    const routine = await this.routinesRepository.findRoutineById(routineId);
    if (!routine) {
      const error = new Error('해당 ID의 루틴을 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    if (journalId !== routine.journalId) {
      const error = new Error('해당 일지에 속하지 않는 루틴이므로 변경할 권한이 없습니다.');
      error.statusCode = 403;
      throw error;
    }

    const checkDate = new Date(date);
    let isCompleted;
    const existingCheckRoutine = await this.routinesRepository.findRoutineCheckByRoutineIdAndDate(
      routineId,
      checkDate
    );

    if (existingCheckRoutine) {
      isCompleted = !existingCheckRoutine.isCompleted;
    } else {
      isCompleted = true;
    }

    const updatedCheckRoutine = await this.routinesRepository.upsertRoutineCheck(
      routineId,
      journalId,
      checkDate,
      isCompleted
    );

    return updatedCheckRoutine;
  };

  getWeeklyRoutineStatus = async (journalId, date) => {
    const journal = await this.journalsRepository.findJournalById(journalId);
    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    const routines = await this.routinesRepository.getAllRoutinesByJournalId(journalId);
    if (routines.length === 0) {
      return { routines: [], totalCount: 0 };
    }

    const baseDate = new Date(date);
    baseDate.setUTCHours(0, 0, 0, 0);

    // 확인해야할 날짜 baseDate가 무슨 요일인지 확인
    const dayOfWeek = baseDate.getUTCDay();

    // 최종적으로 반환할 데이터의 시작날(월요일)의 날짜를 구하는 로직
    let diffToMonday;
    if (dayOfWeek === 0) {
      diffToMonday = dayOfWeek - 6;
    } else {
      diffToMonday = 1 - dayOfWeek;
    }

    // baseDate에 계산된 diffToMonday를 더하여 해당 주의 월요일 날짜를 구함
    const mondayOfWeek = new Date(baseDate);
    mondayOfWeek.setUTCDate(baseDate.getUTCDate() + diffToMonday);
    mondayOfWeek.setUTCHours(0, 0, 0, 0);

    // 계산된 월요일을 기준으로 해당 주의 일요일을 계산
    const sundayOfWeek = new Date(mondayOfWeek);
    sundayOfWeek.setUTCDate(mondayOfWeek.getUTCDate() + 6);
    sundayOfWeek.setUTCHours(23, 59, 59, 999);

    const weeklyChecks = await this.routinesRepository.findRoutineChecksByJournalIdAndDateRange(
      journalId,
      mondayOfWeek,
      sundayOfWeek
    );

    const daysofWeekNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);

    const routinesWithStatus = routines.map((routine) => {
      const weeklyCompletion = {};
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(mondayOfWeek);
        currentDay.setUTCDate(mondayOfWeek.getUTCDate() + i);
        currentDay.setUTCHours(0, 0, 0, 0);

        const dayKey = daysofWeekNames[currentDay.getUTCDay()];

        let isCompletedToday = false;
        if (currentDay.getTime() > now.getTime()) {
          isCompletedToday = false;
        } else {
          isCompletedToday = weeklyChecks.some(
            (check) =>
              check.routineId === routine.id &&
              check.isCompleted === true &&
              check.date.getTime() === currentDay.getTime()
          );
        }
        weeklyCompletion[dayKey] = isCompletedToday;
      }
      return {
        ...routine,
        weeklyCompletion: weeklyCompletion,
      };
    });
    return { routines: routinesWithStatus, totalCount: routines.length };
  };
}
