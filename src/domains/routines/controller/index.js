import { isUUID } from '../../utils/validator.utils.js';

export class RoutinesController {
  constructor(routinesService) {
    this.routinesService = routinesService;
  }

  getAllRoutinesByJournalId = async (req, res, next) => {
    try {
      const { journalId } = req.query;

      // 유효성 검사는 미들웨어에서 진행하였습니다.
      // middlewares 폴더의 validateGetRoutinesByJournalId 참고
      const routines = await this.routinesService.getAllRoutinesByJournalId(journalId);

      res.status(200).json({ data: routines });
    } catch (error) {
      // 에러 처리는 에러 라우터에게
      next(error);
    }
  };

  // 컨트롤러의 역할은 request에서 받은 데이터를 service에게 넘겨주고,
  // 완성된 데이터(service,repository를 거쳐 완성된 데이터)를 response로 돌려주는 것
  // 에러 처리는 에러 라우터가 담당하기 때문에 에러를 에러라우터에게 넘겨주는 역할까지만 수행합니다.
  createRoutine = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      const { title } = req.body;

      // 위에서 이미 구조분해할당을 통해 title을 가져왔기 때문에 서비스로 데이터를 넘겨줄때는 title으로 넘겨줍니다.
      const newRoutine = await this.routinesService.createRoutine(journalId, title);

      res.status(201).json({ data: newRoutine });
    } catch (error) {
      next(error);
    }
  };

  updateRoutine = async (req, res, next) => {
    try {
      const { routineId } = req.params;
      const updateData = req.body;
      const result = await this.routinesService.updateRoutineById(routineId, updateData);
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };

  deleteRoutine = async (req, res, next) => {
    try {
      const { journalId } = req.query;
      const { routineId } = req.params;

      await this.routinesService.deleteRoutineById(journalId, routineId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  updateCheckRoutine = async (req, res, next) => {
    try {
      const { routineId } = req.params;
      const { journalId } = req.query;
      const { date } = req.body;

      const updatedCheckRoutine = await this.routinesService.updateCheckRoutine(
        routineId,
        journalId,
        date
      );
      res.status(200).json({ data: updatedCheckRoutine });
    } catch (error) {
      next(error);
    }
  };

  getWeeklyRoutineStatus = async (req, res, next) => {
    try {
      const { journalId, date } = req.query;

      const weeklyRoutinesSatatus = await this.routinesService.getWeeklyRoutineStatus(
        journalId,
        date
      );
      res.status(200).json(weeklyRoutinesSatatus);
    } catch (error) {
      next(error);
    }
  };
}
