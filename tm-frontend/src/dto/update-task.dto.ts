import { TaskStatus } from "./task.dto";

export class UpdateTaskDTO {
    title?: string;
    description?: string;
    status?: TaskStatus;
} 