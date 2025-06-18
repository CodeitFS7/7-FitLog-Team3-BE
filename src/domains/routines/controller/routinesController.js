import { routinesService } from '../service/routinesService.js';


export class RoutinesController {
  constructor() {
      this.routinesService = routinesService;
      this.createRoutine = this.createRoutine.bind(this);
      this.updateRoutine = this.updateRoutine.bind(this);
  }
  async createRoutine(req, res, next) {
    try {
      const { journalId } = req.params; 
      const { title } = req.body;

      const newRoutine = await this.routinesService.create(journalId, { title });

      res.status(201).json({
          message: "루틴이 성공적으로 생성되었습니다.",
          routine: newRoutine,
      });
  } catch (err) {
    next(err);
    }
  }
  
async updateRoutine(req, res, next) {
  try {
      const { routineId } = req.params; 
      const updateData = req.body; 

      const result = await this.routinesService.update(routineId, updateData);
      if (result && result.message === "변경 사항이 없어 루틴을 업데이트하지 않았습니다.") {
        return res.status(200).json({ message: result.message, routine: result.routine });
      }

      res.status(200).json({
        message: "루틴 수정이 성공했습니다.",
        routine: result,
      });
    } catch (err) {
      next(err);
    }
  }
}