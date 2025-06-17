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

  // DELETE /journals/:id 요청을 처리하는 컨트롤러
  deleteJournal = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteJournalById(id);
      res.status(404).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
