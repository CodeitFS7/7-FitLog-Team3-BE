import exerciseLogService from '../service/index.js';

class ExerciselogController {
  constructor(ExerciseLogService) {
    this.ExerciseLogService = ExerciseLogService;
  }

  //POST
  create = async (req, res) => {
    const { startTime, endTime, goalTime } = req.body;

    const result = await this.ExerciseLogService.create({
      journalId,
      startTime,
      endTime,
      goalTime,
    });

    res.status(200).json(result);
  };

  // GET 
  getLatestLogWithSummary = async (req, res) => {
   const { journalId } = req.params;

    const result = await this.ExerciseLogService.getLatestLogWithSummary(journalId);

   res.status(200).json(result);
  };
}

export default ExerciselogController;
