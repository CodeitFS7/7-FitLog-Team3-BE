import routineService from '../service/service.js';

export const getAllRoutines = async (req, res) => {
  try {
    const routines = await routineService.getAllRoutines();
    res.status(200).json(routines);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    await routineService.deleteRoutine(id, userId);
    res.sendStatus(204);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
