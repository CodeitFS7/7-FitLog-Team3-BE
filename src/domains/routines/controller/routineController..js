
import { routineService } from '../services/routineService.js';

export class RoutinesController {
  async createRoutine(req, res, next) {
    try {
      const journalId = req.params.journalId;
      const data = req.body;
      const result = await routineService.createRoutine(journalId, data);
      res.status(201).json({ message: "루틴 생성 성공", journal: result });
    } catch (err) {
      next(err);
    }
  }

  async updateRoutine(req, res, next) {
    try {
      const journalId = req.params.journalId;
      const data = req.body;
      const result = await routineService.updateRoutine(journalId, data);
      res.status(200).json({ message: "루틴 수정 성공", journal: result });
    } catch (err) {
      next(err);
    }
  }
}

export default RoutinesController;
