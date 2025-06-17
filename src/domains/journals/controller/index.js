export class JournalsController {
  journalsService;
  constructor(journalsService) {
    this.journalsService = journalsService;
  }

  createJournal = async (req, res, next) => {
    try {
      const { title, nickname, description, password, background } = req.body;

      const newJournal = await this.journalsService.createJournal(
        title,
        nickname,
        description,
        password,
        background
      );
      return res.status(201).json({ data: newJournal });
    } catch (error) {
      next(error);
    }
  };

  getJournals = async (req, res, next) => {
    try {
      const queryParams = req.query;
      const journalsData = await this.journalsService.findAllJournals(queryParams);

      return res.status(200).json({ data: journalsData });
    } catch (error) {
      next(error);
    }
  };
}
