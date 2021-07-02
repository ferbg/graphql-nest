import { v4 as uuidv4 } from 'uuid';

import { HttpException, Injectable } from '@nestjs/common';

import { TASKS } from './../mocks/tasks.mock';

import { Task } from './models/task';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  tasks: Task[];

  constructor() {
    this.tasks = TASKS;
  }

  public list(): Task[] {
    return this.tasks;
  }

  public get(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public async create(dto: CreateTaskDto): Promise<Task> {
    const newTask: Task = {
      id: uuidv4(),
      ...dto,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  public async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const index = this.tasks.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException('Task not found', 404);
    }

    const task: Task = this.tasks.find((task) => task.id === id);
    if (dto.title) {
      task.title = dto.title;
    }
    if (dto.description) {
      task.description = dto.description;
    }
    if (dto.completed !== undefined) {
      task.completed = dto.completed;
    }
    return this.tasks.find((task) => task.id === id);
  }

  public delete(id: string): Task[] {
    const index = this.tasks.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException('Task not found', 404);
    }

    this.tasks.splice(index, 1);
    return this.tasks;
  }
}
