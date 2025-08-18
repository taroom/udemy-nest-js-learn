import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) { }

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async viewTask(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    // jika tidak ada maka lemparkan exception 404
    if (!found) throw new NotFoundException(`Tidak ditemukan tugas dengan id: "${id}" `);

    return found;
  }

  async updateTask(updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const { title, description, id, taskStatus } = updateTaskDto;

    const taskUpdating: Task = await this.viewTask(id, user);

    if (title) {
      taskUpdating.title = title;
    }

    if (description) {
      taskUpdating.description = description;
    }

    if (taskStatus) {
      taskUpdating.status = taskStatus;
    }

    await this.tasksRepository.save(taskUpdating);

    return taskUpdating;
  }

  async updateTaskStatus(id: string, taskStatus: TaskStatus, user: User): Promise<Task> {
    const taskUpdating: Task = await this.viewTask(id, user);
    taskUpdating.status = taskStatus;
    await this.tasksRepository.save(taskUpdating);

    return taskUpdating;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const taskChecking: Task = await this.viewTask(id, user);

    const result = await this.tasksRepository.delete({ id });

    if (result.affected == 0)
      throw new NotFoundException(`Tidak ditemukan tugas dengan id: "${id}" `);
  }
}
