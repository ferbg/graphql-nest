import { TASKS } from './../mocks/tasks.mock';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { Task } from './models/task';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksResolver', () => {
  let service: TasksService;
  let resolver: TasksResolver;

  beforeEach(async () => {
    service = new TasksService();
    resolver = new TasksResolver(service);
  });

  afterEach(() => jest.resetAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const result = TASKS;
      jest.spyOn(service, 'list').mockImplementation(() => TASKS);
      expect(await resolver.getTasks()).toBe(result);
    });
  });

  describe('getTask', () => {
    it('should return the selected task', async () => {
      const result = {
        id: '333333',
        title: 'Task #333333',
        description: 'This is the description for the task #333333',
        completed: true,
      };
      jest.spyOn(service, 'get').mockImplementation(() => result);
      expect(await resolver.getTask('333333')).toBe(result);
    });
  });

  describe('createTask', () => {
    it('should return the created task', async () => {
      const newTask: CreateTaskDto = {
        title: 'new task',
        description: 'new task description',
      };
      const result: Task = {
        ...new Task(),
        ...{ id: '111-222-333' },
        ...newTask,
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(result));
      const addedTask = await resolver.createTask(newTask);

      expect(addedTask).toBeDefined();
      expect(addedTask).toStrictEqual(result);
    });
  });

  describe('updateTask', () => {
    it('should return the updated task', async () => {
      const taskDto: UpdateTaskDto = {
        title: 'title -- modified',
        description: 'description -- modified',
        completed: false,
      };
      const result: Task = {
        ...{ id: '111-222-333' },
        ...taskDto,
      } as Task;

      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(result));
      const modifiedTask = await resolver.updateTask('111-222-333', taskDto);

      expect(modifiedTask).toBeDefined();
      expect(modifiedTask).toStrictEqual(result);
    });
  });

  describe('deleteTask', () => {
    it('should return an empty array', async () => {
      const result = [TASKS[0]];
      jest.spyOn(service, 'delete').mockImplementation(() => result);
      expect(await resolver.deleteTask('333333')).toStrictEqual([TASKS[0]]);
    });
  });
});
