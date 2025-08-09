import { TaskStatus } from '../tasks.model';

export class UpdateTaskDto {
  id: string;
  title: string;
  description: string;
  taskStatus: TaskStatus;
}
