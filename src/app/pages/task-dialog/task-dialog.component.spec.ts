import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogComponent } from './task-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/app/models/task.model';

fdescribe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<TaskDialogComponent>>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTitlesList']);

    TestBed.configureTestingModule({
      declarations: [TaskDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { task: { id: '1', title: '', description: '', dueDate: '' } } },
        { provide: TaskService, useValue: mockTaskService },
      ],
      imports: [FormsModule, MatDialogModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog and return updated task when onSaveTask is called', () => {
    component.data.task.title = 'Test Task';
    component.data.task.description = 'Test Description';
    component.dueDateInput = '2024-12-01';

    component.onSaveTask();

    expect(component.dialogRef.close).toHaveBeenCalledWith(component.data.task);
  });

  it('should not save task if title or description are missing and close the dialog', () => {
    const mockTask : Task= {
      _id: '1', title: '',
      userid: '',
      description: '',
      status: '',
      priority: '',
      dueDate: '',
      created: '',
      lastupdated: ''
    };
    component.data = { task: mockTask };
    
    component.onSaveTask();
  
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog without saving changes', () => {
    component.onNoClick();
    
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should fetch existing titles on initialization', () => {
    const mockTitles = ['Task 1', 'Task 2'];
    mockTaskService.getTitlesList.and.returnValue(of(mockTitles));
  
    component.ngOnInit();
  
    expect(mockTaskService.getTitlesList).toHaveBeenCalled();
    expect(component.existingTitles).toEqual(mockTitles);
  });
  
  
});
