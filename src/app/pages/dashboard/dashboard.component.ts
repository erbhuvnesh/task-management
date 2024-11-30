import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tasks: Task[] = [];
  userId: string = '674afbfd2b1bf3af4c42592e'; // Hardcoding userId for a user stored in database for this example, needs additional implementation to fetch userId dynamically for logined user
  displayedColumns: string[] = ['title', 'status', 'priority', 'dueDate', 'expand'];
  filteredTasks: MatTableDataSource<Task>;
  expandedTask: Task | null = null;
  searchQuery: string = '';
  statusOptions: string[] = ['todo', 'inprogress', 'done'];
  statusFilters = {
    todo: true,
    inProgress: true,
    done: true,
  };

  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.filteredTasks = new MatTableDataSource<Task>([]);
   }

   ngOnInit(): void {
    this.loadTasks();
  }


  // Expand/Collapse a row
  toggleRow(task: Task): void {
    this.expandedTask = this.expandedTask === task ? null : task;
  }

  loadTasks(): void {
    this.taskService.getTasks(this.userId).subscribe((data: Task[]) => {
      this.tasks = data;
      this.filteredTasks.data = this.tasks; // Initialize with all tasks
      this.filteredTasks.paginator = this.paginator; // Connect paginator
      this.filteredTasks.sort = this.sort; // Connect sorting
      // this.updateTableData();
    });
  }



  applyFilters(): void {
    // Apply search and status filters
    const filtered = this.tasks.filter((task) => {
      const searchMatch = task.title?.toLowerCase().includes(this.searchQuery.trim().toLowerCase());
      const statusMatch =
        (this.statusFilters.todo && task.status === 'todo') ||
        (this.statusFilters.inProgress && task.status === 'inprogress') ||
        (this.statusFilters.done && task.status === 'done');

      return searchMatch && statusMatch;
    });

    this.filteredTasks.data = filtered; // Update the data source
  }


  addTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      minWidth: '250px',
      width: '40vw',
      data: { task: { userId: this.userId } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.addTask(result).subscribe(res => {
          console.log("Task created successfully");
          this.loadTasks();
        })
      }
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      minWidth: '250px',
      width: '40vw',
      data: { task: { ...task } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result).subscribe(res => {
          console.log("Task updated successfully");
          this.loadTasks();
        })
      }
    });
  }

  deleteTask(id: string | null): void {
    if(!id){return};
    this.taskService.deleteTask(id).subscribe(res=>{
      console.log("Task Deleted")
      this.loadTasks();
    })
  }

  // Get button styles based on status
getStatusButtonStyles(status: string): { [key: string]: string } {
  switch (status) {
    case 'todo':
      return { backgroundColor: '#fafafa', border: '1px solid #5d6d7e' };
    case 'inprogress':
      return { backgroundColor: '#fbe9e7', border: '1px solid #ff9800' };
    case 'done':
      return { backgroundColor: '#d5f5e3', border: '1px solid #2e7d32' };
    default:
      return {};
  }
}

// Get text color for the button
getStatusTextColor(status: string): string {
  switch (status) {
    case 'todo':
      return '#004b55';
    case 'inprogress':
      return '#e65100'; 
    case 'done':
      return '#1b5e20'; 
    default:
      return '#000';
  }
}

showStatus(status: string): string {
  switch (status) {
    case 'todo':
      return 'To Do';
    case 'inprogress':
      return 'In Progress'; // Darker orange
    case 'done':
      return 'Done'; // Darker green
    default:
      return '';
  }
}

// Update the task status
updateTaskStatus(task: Task, newStatus: string): void {
  task.status = newStatus;
  this.taskService.updateTask(task).subscribe((updatedTask) => {
    console.log('Task status updated successfully', updatedTask);
  });
}

// Toggle status options (placeholder if additional logic needed)
toggleStatusOptions(task: Task): void {
  console.log('Status options opened for:', task);
}

  // Get dynamic color for priority chip
  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'low':
        return 'accent';
      case 'medium':
        return 'primary';
      case 'high':
        return 'warn';
      default:
        return '';
    }
  }



}

