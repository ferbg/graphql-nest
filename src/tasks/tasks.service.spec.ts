import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './models/task';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listing', () => {
    it('shoud return the list', () => {
      expect(service.list()).toBeDefined();
    });
  });

  describe('getting by id', () => {
    it('shoud return a task for a valid id', () => {
      const task: Task = service.get('1');
      expect(task).toBeDefined();
      expect(task.id).toBeDefined();
      expect(task.title).toBeDefined();
      expect(task.description).toBeDefined();
    });

    it('should throw an error for an invalid id', () => {
      expect(() => {
        service.get('333333');
      }).toThrowError('Task not found');
    });
  });

  describe('creating task', () => {
    it('shoud return the new task', async () => {
      const newTask: CreateTaskDto = {
        title: 'new task',
        description: 'new task description',
      };
      const addedTask: Task = await service.create(newTask);

      expect(addedTask).toBeDefined();
      expect(addedTask.id).toBeDefined();
      expect(addedTask.title).toEqual(newTask.title);
      expect(addedTask.description).toEqual(newTask.description);
      //  Not completed on init
      expect(addedTask.completed).toBeFalsy();
    });
  });

  describe('updating task', () => {
    let theTask: Task;
    beforeAll(async () => {
      const newTask: CreateTaskDto = {
        title: 'new task',
        description: 'new task description',
      };
      theTask = await service.create(newTask);
    });

    it('shoud update the task', async () => {
      const taskDto: UpdateTaskDto = {
        title: theTask.title + ' -- modified',
        description: theTask.description + ' -- modified',
      };

      const modifiedTask: Task = await service.update(theTask.id, taskDto);

      expect(modifiedTask).toBeDefined();
      expect(modifiedTask.id).toEqual(theTask.id);
      expect(modifiedTask.title).toEqual(taskDto.title);
      expect(modifiedTask.description).toEqual(taskDto.description);
      expect(modifiedTask.completed).toBeFalsy();
    });

    it('shoud mark as completed the task', async () => {
      const taskDto: UpdateTaskDto = {
        completed: true,
      };

      const modifiedTask: Task = await service.update(theTask.id, taskDto);

      expect(modifiedTask).toBeDefined();
      expect(modifiedTask.id).toEqual(theTask.id);
      expect(modifiedTask.completed).toBeTruthy();
    });
  });

  describe('deleting task', () => {
    let theTask: Task;
    let tasksCount: number;
    beforeAll(async () => {
      const newTask: CreateTaskDto = {
        title: 'new task',
        description: 'new task description',
      };
      theTask = await service.create(newTask);
      tasksCount = await service.list().length;
    });

    it('shoud delete the task', async () => {
      const tasks: Task[] = await service.delete(theTask.id);
      //  A task have been removed
      expect(tasksCount - 1).toEqual(tasks.length);
    });

    it('should throw an error for an invalid id', () => {
      expect(() => {
        service.delete('333333');
      }).toThrowError('Task not found');
    });
  });
});
