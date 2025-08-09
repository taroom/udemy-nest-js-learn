import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string; // ? berarti optional atau nggak harus ada
}
