import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TaskService } from '../../services/task.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { of, throwError } from 'rxjs';
import { Task } from '../../models/task.model';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let taskServiceMock: jasmine.SpyObj<TaskService>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    taskServiceMock = jasmine.createSpyObj('TaskService', ['getTasks', 'addTask', 'updateTask', 'deleteTask']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of({ title: 'New Task', status: 'todo', priority: 'low' }));

    dialogMock.open.and.returnValue(dialogRefMock);
    const mockTasks: Task[] = [
      { _id: '1', title: 'Task 1', status: 'todo', priority: 'low', dueDate: '2024-12-31', userid: '123', description:'', created:'', lastupdated:'' },
      { _id: '2', title: 'Task 2', status: 'inprogress', priority: 'medium', dueDate: '2024-11-30', userid: '123', description:'', created:'', lastupdated:'' }
    ];

    taskServiceMock.getTasks.and.returnValue(of(mockTasks));

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [MatDialogModule, MatSnackBarModule, MatTableModule, BrowserAnimationsModule],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should load tasks on init', () => {
    const mockTasks: Task[] = [
      { _id: '1', title: 'Task 1', status: 'todo', priority: 'low', dueDate: '2024-12-31', userid: '123', description:'', created:'', lastupdated:'' },
      { _id: '2', title: 'Task 2', status: 'inprogress', priority: 'medium', dueDate: '2024-11-30', userid: '123', description:'', created:'', lastupdated:'' }
    ];

    taskServiceMock.getTasks.and.returnValue(of(mockTasks));
    component.ngOnInit();
    fixture.detectChanges();

    expect(taskServiceMock.getTasks).toHaveBeenCalled();
    expect(component.tasks.length).toBe(2);
    expect(component.noData).toBeFalse();
  });

  it('should display "No tasks found" message if no tasks are returned', () => {
    taskServiceMock.getTasks.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.noData).toBeTrue();
  });


  it('should delete a task and show success snackbar', () => {
    const mockTask = { _id: '1', title: 'Task 1', status: 'todo', priority: 'low', dueDate: '2024-12-31', userId: '123' };

    taskServiceMock.deleteTask.and.returnValue(of(null));

    component.deleteTask(mockTask._id);
    fixture.detectChanges();

    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(mockTask._id);
    expect(snackBarMock.open).toHaveBeenCalledWith('Task deleted successfully!', 'Close', { duration: 3000, panelClass: 'green-snackbar' });
  });

  it('should show error snackbar if task deletion fails', () => {
    const mockTask = { id: '1', title: 'Task 1', status: 'todo', priority: 'low', dueDate: '2024-12-31', userId: '123' };

    taskServiceMock.deleteTask.and.returnValue(throwError('Error'));

    component.deleteTask(mockTask.id);
    fixture.detectChanges();

    expect(snackBarMock.open).toHaveBeenCalledWith('Failed to delete task!', 'Close', { duration: 3000, panelClass: 'red-snackbar' });
  });

  it('should filter tasks based on the search query', () => {
    const mockTasks: Task[] = [
      { _id: '1', title: 'Task 1', status: 'todo', priority: 'low', dueDate: '2024-12-31', userid: '123', description:"", created:"", lastupdated:""},
      { _id: '2', title: 'Task 2', status: 'inprogress', priority: 'medium', dueDate: '2024-11-30', userid: '123',description:"", created:"", lastupdated:"" }
    ];
    component.tasks = mockTasks;
    component.searchQuery = 'Task 1';
    component.applyFilters();
    fixture.detectChanges();

    expect(component.filteredTasks.data.length).toBe(2);
    expect(component.filteredTasks.data[0].title).toBe('Task 1');
  });


  it('should create a new task and show a success message', () => {
    const mockTask: Task = {
      _id: '123',
      title: 'New Task',
      status: 'todo',
      priority: 'low',
      dueDate: null,
      userid: '',
      description: '',
      created: '',
      lastupdated: ''
    };
    taskServiceMock.addTask.and.returnValue(of(mockTask));
    spyOn(component, 'loadTasks');

    component.addTask();

    expect(dialogMock.open).toHaveBeenCalledWith(TaskDialogComponent, {
      minWidth: '250px',
      width: '40vw',
      data: { task: { userId: component.userId } }
    });
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it('should edit an existing task and show a success message', () => {
    const mockTask: Task = {
      _id: '123',
      title: 'Updated Task',
      status: 'inprogress',
      priority: 'high',
      dueDate: '2024-12-31',
      userid: '',
      description: '',
      created: '',
      lastupdated: ''
    };
  
    const dialogReturnData: Task = {
      _id: '123', title: 'Updated Task', status: 'inprogress', priority: 'high', dueDate: '2024-12-31',
      userid: '',
      description: '',
      created: '',
      lastupdated: ''
    };
  
    // Mocking the dialog open method
    dialogMock.open.and.returnValue({
      afterClosed: () => of(dialogReturnData),
    } as any);
  
    // Mocking the updateTask method in the task service
    taskServiceMock.updateTask.and.returnValue(of(mockTask));
    spyOn(component, 'loadTasks');
  
    component.editTask(mockTask);
  
    expect(dialogMock.open).toHaveBeenCalledWith(TaskDialogComponent, {
      minWidth: '250px',
      width: '40vw',
      data: { task: { ...mockTask } },
    });
  
    expect(taskServiceMock.updateTask).toHaveBeenCalledWith(dialogReturnData);
    expect(component.loadTasks).toHaveBeenCalled();
  });

  it('should calculate the number of days left for a due date', () => {
    const today = new Date();
    const futureDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toISOString();
  
    expect(component.getDueDays(futureDate)).toBe(5);
  });
  
  it('should return a negative number if the due date is in the past', () => {
    const today = new Date();
    const pastDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString();
  
    expect(component.getDueDays(pastDate)).toBe(-5);
  });

  it('should return correct styles for "todo" status', () => {
    expect(component.getStatusButtonStyles('todo')).toEqual({
      backgroundColor: '#fafafa',
      border: '1px solid #5d6d7e',
    });
  });
  
  it('should return correct styles for "inprogress" status', () => {
    expect(component.getStatusButtonStyles('inprogress')).toEqual({
      backgroundColor: '#fbe9e7',
      border: '1px solid #ff9800',
    });
  });
  
  it('should return correct styles for "done" status', () => {
    expect(component.getStatusButtonStyles('done')).toEqual({
      backgroundColor: '#d5f5e3',
      border: '1px solid #2e7d32',
    });
  });
  
  it('should return an empty object for an unknown status', () => {
    expect(component.getStatusButtonStyles('unknown')).toEqual({});
  });
  
  it('should return correct text color for "todo" status', () => {
    expect(component.getStatusTextColor('todo')).toBe('#004b55');
  });
  
  it('should return correct text color for "inprogress" status', () => {
    expect(component.getStatusTextColor('inprogress')).toBe('#e65100');
  });
  
  it('should return correct text color for "done" status', () => {
    expect(component.getStatusTextColor('done')).toBe('#1b5e20');
  });
  
  it('should return default text color for unknown status', () => {
    expect(component.getStatusTextColor('unknown')).toBe('#000');
  });

  
  it('should return correct status label for "todo"', () => {
    expect(component.showStatus('todo')).toBe('To Do');
  });
  
  it('should return correct status label for "inprogress"', () => {
    expect(component.showStatus('inprogress')).toBe('In Progress');
  });
  
  it('should return correct status label for "done"', () => {
    expect(component.showStatus('done')).toBe('Done');
  });
  
  it('should return an empty string for unknown status', () => {
    expect(component.showStatus('unknown')).toBe('');
  });

  
  it('should update task status and make API call', () => {
    const mockTask: Task = {
      _id: '123',
      title: 'Sample Task',
      status: 'todo',
      priority: 'low',
      dueDate: '2024-12-31',
      userid: '',
      description: '',
      created: '',
      lastupdated: ''
    };
    const updatedTask: Task = { ...mockTask, status: 'inprogress' };
  
    taskServiceMock.updateTask.and.returnValue(of(updatedTask));
  
    component.updateTaskStatus(mockTask, 'inprogress');
  
    expect(mockTask.status).toBe('inprogress');
    expect(taskServiceMock.updateTask).toHaveBeenCalledWith(updatedTask);
  });
  
  it('should return "accent" for low priority', () => {
    expect(component.getPriorityColor('low')).toBe('accent');
  });
  
  it('should return "primary" for medium priority', () => {
    expect(component.getPriorityColor('medium')).toBe('primary');
  });
  
  it('should return "warn" for high priority', () => {
    expect(component.getPriorityColor('high')).toBe('warn');
  });
  
  it('should return an empty string for unknown priority', () => {
    expect(component.getPriorityColor('unknown')).toBe('');
  });

  
});
