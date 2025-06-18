import { routinesRepository } from '../repository/routinesRepository.js';

class UpdateRoutine {
    constructor(updateRoutine) {
      this.updateRoutine = updateRoutine;
    }
  /* 루틴 존재 여부 확인*/ 
      async execute(routineId, updateData) {
        const existingRoutine = await this.routinesRepository.findById(routineId);

        if (!existingRoutine) {
            throw new Error('업데이트할 루틴을 찾을 수 없습니다.');
        }
    /* 변경사항 여부 확인*/ 
        let hasChanges = false;
        const dataToUpdate = {};

        if (updateData.title !== undefined) { 
            if (updateData.title !== existingRoutine.title) {
                const existingRoutineWithSameTitle 
                = await this.routinesRepository.findByJournalIdAndTitle(
                    existingRoutine.journalId, 
                    updateData.title
                );

                if (existingRoutineWithSameTitle) {
                    throw new Error('일지에 이미 존재하는 루틴입니다.');
                }

                 hasChanges = true;
                dataToUpdate.title = updateData.title;
            }
        }
        
         if (!hasChanges) {
            return { message: "변경 사항이 존재하지 않습니다", routine: existingRoutine };
        }

     try {
            const updatedRoutine = await this.routinesRepository.findByIdAndUpdate(routineId, dataToUpdate);
            return updatedRoutine;
        } catch (error) {
            throw error;
        }
    }
}

export const updateRoutine = new UpdateRoutine(routinesRepository); 