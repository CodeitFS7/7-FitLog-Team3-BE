import { createRoutine } from "../routineApp/createRoutine.js";
import { updateRoutine } from "../routineApp/updateRoutine.js";

class RoutinesService {
    constructor() {
        this.createRoutineUseCase = createRoutine;
        this.updateRoutineUseCase = updateRoutine;
        /* this.deleteRoutineUseCase = deleteRoutine;
        this.getRoutineByIdUseCase = getRoutineById;
        this.getRoutineListByJournalIdUseCase = getRoutineListByJournalId;*/
    }
      async create(journalId, routineData) {
        return await this.createRoutineUseCase.execute(journalId, routineData);
    }
    async update(routineId, updateData) {
        return await this.updateRoutineUseCase.execute(routineId, updateData);
    }
}

export const routinesService = new RoutinesService();