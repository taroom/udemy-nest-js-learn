import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    // destructuring
    const { status, search } = filterDto;

    // definisikan temporary array untuk melakukan filter
    let tasks = this.getAllTasks();
    // filter status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    // filter search
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    // lakukan destructuring menggunakan js kode seperti dibawah ini untuk mengambil data dari DTO
    const { title, description } = createTaskDto;
    const tasks: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(tasks);
    return tasks;
  }

  viewTask(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(updateTaskDto: UpdateTaskDto): Task {
    const { id, title, description, taskStatus } = updateTaskDto;
    const taskUpdating: Task = this.viewTask(id);
    if (title) {
      taskUpdating.title = title;
    }

    if (description) {
      taskUpdating.description = description;
    }

    if (taskStatus) {
      taskUpdating.status = taskStatus;
    }

    this.deleteTask(id);
    this.tasks.push(taskUpdating);
    return taskUpdating;
  }

  updateTaskStatus(id: string, taskStatus: TaskStatus): Task {
    const taskUpdating: Task = this.viewTask(id);
    taskUpdating.status = taskStatus;
    this.deleteTask(id);
    this.tasks.push(taskUpdating);
    return taskUpdating;
  }

  // d

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id); //proses remove
  }
}
