
class ExerciseLogService {
  constructor(ExerciseLogRepository) {
    this.ExerciseLogRepository = ExerciseLogRepository;
  }

  async create({journalId, startTime, endTime, goalTime }) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    //
    const duration = Math.floor((end - start) / 1000); // 총 운동시간(초)
    const isCompleted = duration >= goalTime; //총 운동시간이 목표시간 이상이면 true
    const basePoint = 3; // 목표달성시 기본 포인트 3점
    const extraPoint = Math.floor(duration / 600); //초과 운동시간
    const earnedPoints = basePoint + extraPoint; //총 득점
      
    //db에 저장할 로그 데이터
    const logData = {
      journalId,
      startTime: start,
      endTime: end,
      goalTime,
      isCompleted,
      earnedPoints
    };

    const savedLog = await this.ExerciseLogRepository.create(logData);


    return {
      message: `${earnedPoints} 포인트를 획득했습니다.`,
      isCompleted,
      earnedPoints,
      savedLog,
    };
  }
}

// GET
getLatestLog = async (journalId) =>{ 
    const latestLog = await this.ExerciseLogRepository.findLatestByJournalId(journalId);
    const totalPoints = await this.ExerciseLogRepository.sumEarnedPoints(journalId);

    return {
      goalTime : latestLog?.goalTime || 0,
      earnedPoints : latestLog.earnedPoints || 0,
      totalearnedPoints : totalPoints || 0,
      isCompleted : latestLog?.isCompleted
    };
  };


  //journalId가 없을때. (캐시 삭제 등..)
  const journalId = req.user?.journalId;
  if (!journalId) {
    throw new Error('운동일지를 찾을 수 없습니다.');
  };

  //목표시간을 입력하지 않고 타이머를 누르는 경우
  if (!goalTime) {
    throw new Error('목표시간은 반드시 설정해야 합니다.');
  };

  // 숫자를 분:초로 변환
  const [minStr, secStr] = goalTime.split(':');
  const min = parseInt(minStr, 10);
  const sec = parseInt(secStr, 10);

  // 분:초가 숫자가 아닌 것이 입력되면 에러
  if (isNaN(min) || isNaN(sec)) {
    throw Error('목표시간은 숫자 형식이어야 합니다.')
  };
     

export default ExerciseLogService;