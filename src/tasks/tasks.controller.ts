import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  getTasks(
    @GetUser() user: User,
    @Query() filterDto: GetTasksFilterDto
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

  @Post()
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  viewTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.viewTask(id);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    updateTaskDto.id = id;
    return this.taskService.updateTask(updateTaskDto);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
