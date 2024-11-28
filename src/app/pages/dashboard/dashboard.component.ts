import { Component, OnInit, ViewChild } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tasks: Task[] = [];
  userId: number = 1; // Assuming logged-in user ID is 1 for this example
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Task>;
  taskCategories: string[] = [];
  topExpenditure: { category: string; amount: number; }

  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.tasks);
   }

  ngOnInit(): void {
    this.loadTasks();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadTasks(): void {

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
        this.taskService.updateTask(task).subscribe(res => {
          console.log("Task updated successfully");
        })
      }
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(res=>{
      console.log("Task Deleted")
    })
  }

}

