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
export class DashboardComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tasks: Task[] = [];
  userId: number = 1; // Assuming logged-in user ID is 1 for this example
  displayedColumns: string[] = ['title', 'status', 'priority', 'dueDate', 'expand'];
  dataSource: MatTableDataSource<Task>;
  taskCategories: string[] = [];
  topExpenditure: { category: string; amount: number; }
  filteredTasks: Task[] = []
  expandedTask: Task | null = null;
  searchQuery: string = '';

  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.tasks);
   }

   ngOnInit(): void {
    this.loadTasks();

    // Configure filter predicate for custom filtering
    this.dataSource.filterPredicate = (task: Task, filter: string) => {
      const lowerFilter = filter.trim().toLowerCase();
      return (
        task.title?.toLowerCase().includes(lowerFilter) || false
      );
    };
  }

   // Filter tasks by search query
   ngOnChanges(): void {
    this.filteredTasks = this.tasks.filter((task) =>
      [task.title]
        .map((field) => field?.toLowerCase())
        .some((field) => field?.includes(this.searchQuery.toLowerCase()))
    );
  }

  // Expand/Collapse a row
  toggleRow(task: Task): void {
    this.expandedTask = this.expandedTask === task ? null : task;
  }

  loadTasks(): void {
    this.taskService.getTasks(1).subscribe((data: Task[]) => {
      this.tasks = data;
      this.dataSource = new MatTableDataSource(this.tasks);

      // Assign paginator and sort to data source
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Apply filter when search query changes
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reset to first page if filter applied
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  // Get dynamic class for status icon
  getStatusIconClass(status: string): string {
    switch (status) {
      case 'todo':
        return 'status-icon-todo';
      case 'inprogress':
        return 'status-icon-inprogress';
      case 'completed':
        return 'status-icon-completed';
      default:
        return '';
    }
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

