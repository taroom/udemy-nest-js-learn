import { IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(1, { message: 'Minimal 1 karakter dong bang' })
  search?: string; // ? berarti optional atau nggak harus ada
}
