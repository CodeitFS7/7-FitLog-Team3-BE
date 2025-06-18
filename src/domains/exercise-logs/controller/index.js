import exerciseLogService from '../service/index.js';

class ExerciselogController {
  constructor(ExerciseLogService) {
    this.ExerciseLogService = ExerciseLogService;
  }

  //POST
  create = async (req, res) => {
    const { startTime, endTime, goalTime } = req.body;

    //journalId가 없을때. (캐시 삭제 등..)
    const journalId = req.user?.journalId;
    if (!journalId) {
      throw new Error('운동일지를 찾을 수 없습니다.');
    }

    //목표시간을 입력하지 않고 타이머를 누르는 경우
    if (!goalTime) {
      throw new Error('목표시간은 반드시 설정해야 합니다.');
    }

    // 숫자를 분:초로 변환
    const [minStr, secStr] = goalTime.split(':');
    const min = parseInt(minStr, 10);
    const sec = parseInt(secStr, 10);

    // 분:초가 숫자가 아닌 것이 입력되면 에러
    if (isNaN(min) || isNaN(sec)) {
      throw Error('목표시간은 숫자 형식이어야 합니다.');
    }

    const result = await this.ExerciseLogService.create({
      journalId,
      startTime,
      endTime,
      goalTime,
    });

    res.status(201).json(result);
  };
}

export default ExerciselogController;
