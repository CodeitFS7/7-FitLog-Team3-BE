class ExerciseLogService {
  constructor(exerciseLogRepository, journalsRepository) {
    this.exerciseLogRepository = exerciseLogRepository;
    this.journalsRepository = journalsRepository;
  }
  // 2025-06-20T11:30:00.000Z -
  // 뺄셈연산이 가능한데 단위가 밀리초(milliseconds, 1/1000초) 단위의 숫자로 돌려줍니다.
  createExerciseLog = async (journalId, startTime, endTime, goalTime) => {
    const journal = await this.journalsRepository.findJournalById(journalId);
    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = Math.floor((end - start) / 1000); // 총 운동시간(초)

    const isCompleted = duration >= goalTime; //총 운동시간이 목표시간 이상이면 true

    let exercisePoint = 0;
    if (isCompleted) {
      const basePoint = 3;
      const extraPoint = Math.floor(duration / 600);
      exercisePoint = basePoint + extraPoint;
    }

    const logDataToCreate = { journalId, startTime, endTime, goalTime, isCompleted, exercisePoint };
    const newExerciseLog = await this.exerciseLogRepository.createExerciseLog(logDataToCreate);

    return newExerciseLog;
  };

  getSumExercisePoint = async (journalId) => {
    const journal = await this.journalsRepository.findJournalById(journalId);

    if (!journal) {
      const error = new Error('해당 ID의 일지를 찾을 수 없습니다.');
      error.statusCode = 404;
      throw error;
    }

    const sumExercisePoint = await this.exerciseLogRepository.getSumExercisePoint(journalId);
    return sumExercisePoint;
  };
}

export default ExerciseLogService;
