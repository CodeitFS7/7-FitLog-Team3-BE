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

/* 구현해야할 Api 와 기능이 많다보니 서비스 로직이 길어질 것을 고려하여 유스케이스(사용자 기능) 기반 
아키텍쳐 폴더(routineApp)를 추가로 생성하여, 각 내부에 들어 있는 파일들이 하나의 기능 로직을 담당하도록 작성되었습니다.
따라서 서비스 폴더안에 기능 로직이 작성되지 않으며, 3계층 레이어의 서비스(어플리케이션) 기능은 app폴더의 파일에서 구현됩니다.
>각 기능을 캡슐화하고 그 기능들을 적절히 꺼내쓸 수 있는 상자역할이 서비스 파일이 된다<정도로 이해해주시면됩니다.*/