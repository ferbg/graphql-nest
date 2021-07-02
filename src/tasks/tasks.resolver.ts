import { PubSub } from 'apollo-server-express';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './models/task';

@Resolver(() => Task)
export class TasksResolver {
  private pubSub = new PubSub();
  constructor(private tasksService: TasksService) {}

  @Query(() => [Task])
  async getTasks() {
    return this.tasksService.list();
  }

  @Query(() => Task)
  async getTask(@Args('id') id: string) {
    return this.tasksService.get(id);
  }

  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskDto) {
    const newTask = await this.tasksService.create(input);
    this.pubSub.publish('taskAdded', { taskAdded: newTask });
    return newTask;
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id') id: string,
    @Args('input') input: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, input);
  }

  @Mutation(() => [Task])
  async deleteTask(@Args('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Subscription(() => Task)
  taskAdded() {
    return this.pubSub.asyncIterator('taskAdded');
  }
}
