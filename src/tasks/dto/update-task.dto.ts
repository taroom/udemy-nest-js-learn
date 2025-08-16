import { TaskStatus } from '../tasks-status.enum';

export class UpdateTaskDto {
  id: string;
  title: string;
  description: string;
  taskStatus: TaskStatus;
}
