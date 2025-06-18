export class EmojisController {
  constructor(emojisService) {
    this.emojisService = emojisService;
  }

  addOrUpdateEmoji = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      const { emojiType } = req.body;

      const updateEmoji = await this.emojisService.addOrUpdateEmoji(journalId, emojiType);
      return res.status(200).json({ data: updateEmoji });
    } catch (error) {
      next(error);
    }
  };
}
