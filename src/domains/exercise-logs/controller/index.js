import exerciseLogService from '../service/index.js';

class ExerciseLogController {
  constructor(exerciseLogService) {
    this.exerciseLogService = exerciseLogService;
  }

  createExerciseLog = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      const { startTime, endTime, goalTime } = req.body;

      const newExerciseLog = await this.exerciseLogService.createExerciseLog(
        journalId,
        startTime,
        endTime,
        goalTime
      );

      res.status(201).json(newExerciseLog);
    } catch (error) {
      next(error);
    }
  };

  getSumExercisePoint = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      const sumExercisePoint = await this.exerciseLogService.getSumExercisePoint(journalId);
      res.status(200).json(sumExercisePoint);
    } catch (error) {
      next(error);
    }
  };
}

export default ExerciseLogController;
