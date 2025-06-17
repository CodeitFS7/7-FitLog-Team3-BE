// service/exerciseLogService.js
class ExerciseLogService {
    constructor(exerciseLogRepository) {
      this.exerciseLogRepository = exerciseLogRepository;
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
  
      const savedlog = await this.exerciseLogRepository.create(logData);
  
      return {
        message: `${earnedPoints} 포인트를 획득했습니다.`,
        isCompleted,
        earnedPoints,
        savedlog,
      };
    }
  }
  
  export default ExerciseLogService;