import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async viewTask(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    // jika tidak ada maka lemparkan exception 404
    if (!found) throw new NotFoundException(`Tidak ditemukan tugas dengan id: "${id}" `);
    return found;
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, id, taskStatus } = updateTaskDto;

    const taskUpdating: Task = await this.viewTask(id);

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

  // updateTask(updateTaskDto: UpdateTaskDto): Task {
  //   const { id, title, description, taskStatus } = updateTaskDto;
  //   const taskUpdating: Task = this.viewTask(id);
  //   if (title) {
  //     taskUpdating.title = title;
  //   }

  //   if (description) {
  //     taskUpdating.description = description;
  //   }

  //   if (taskStatus) {
  //     taskUpdating.status = taskStatus;
  //   }

  //   this.deleteTask(id);
  //   this.tasks.push(taskUpdating);
  //   return taskUpdating;
  // }

  async updateTaskStatus(id: string, taskStatus: TaskStatus): Promise<Task> {
    const taskUpdating: Task = await this.viewTask(id);
    taskUpdating.status = taskStatus;
    await this.tasksRepository.save(taskUpdating);

    return taskUpdating;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({ id: id });

    if (result.affected == 0)
      throw new NotFoundException(`Tidak ditemukan tugas dengan id: "${id}" `);
  }
}
