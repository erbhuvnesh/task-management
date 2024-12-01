import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

fdescribe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockTask: Task = {
    _id: '1',
    title: 'TestTask',
    description: 'Test Task Description',
    userid: 'user123',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-12-31T00:00:00Z',
    created: '2024-12-01T00:00:00Z',
    lastupdated: '2024-12-01T00:00:00Z',
  };

  const mockTasks: Task[] = [mockTask];
  const mockTitles: string[] = ['TestTask', 'Another Task'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', () => {
    service.addTask(mockTask).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(mockTask);
  });

  it('should update a task', () => {
    service.updateTask(mockTask).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/tasks/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockTask);
  });


  it('should get tasks by userId', () => {
    service.getTasks('user123').subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/tasks?userId=user123');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should check if task title exists', () => {
    service.isTitleExist('TestTask').subscribe((exists) => {
      expect(exists).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:5000/api/tasks?title=TestTask');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should return titles list', () => {
    service.getTitlesList().subscribe((titles) => {
      expect(titles).toEqual(mockTitles);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/tasks/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockTitles);
  });
});
